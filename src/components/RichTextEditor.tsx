import { useRef, useCallback, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Youtube,
  Image as ImageIcon,
  Undo,
  Redo,
  Quote,
  Code,
  Minus,
  Table,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);
  const savedSelection = useRef<Range | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [youtubeDialogOpen, setYoutubeDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [tableDialogOpen, setTableDialogOpen] = useState(false);

  // Only update innerHTML when value changes externally (not from typing)
  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }
    isInternalChange.current = false;
  }, [value]);

  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    savedSelection.current = sel.getRangeAt(0).cloneRange();
  }, []);

  const restoreSelection = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || !savedSelection.current) return;
    sel.removeAllRanges();
    sel.addRange(savedSelection.current);
  }, []);

  const execCommand = useCallback((command: string, val?: string) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    handleInput();
  }, []);

  const sanitizePastedHtml = useCallback((html: string) => {
    try {
      const doc = new DOMParser().parseFromString(html, "text/html");

      // Remove inline color/background styles that commonly come from Google Docs/Notion/Word
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT);
      let node = walker.currentNode as Element;

      const stripFromEl = (el: Element) => {
        const style = (el as HTMLElement).style;
        if (!style) return;

        // Remove only the parts that can make content unreadable on dark backgrounds
        style.removeProperty("color");
        style.removeProperty("background");
        style.removeProperty("background-color");
      };

      // First element
      if (node) stripFromEl(node);

      while (walker.nextNode()) {
        node = walker.currentNode as Element;
        if (node) stripFromEl(node);
      }

      return doc.body.innerHTML;
    } catch {
      return html;
    }
  }, []);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      // We intercept paste to prevent inline styles like `color: rgb(0,0,0)`
      // from being stored in the CMS and becoming unreadable on dark theme.
      e.preventDefault();

      const clipboard = e.clipboardData;
      const html = clipboard.getData("text/html");
      const text = clipboard.getData("text/plain");

      if (html) {
        const clean = sanitizePastedHtml(html);
        execCommand("insertHTML", clean);
      } else if (text) {
        execCommand("insertText", text);
      }
    },
    [execCommand, sanitizePastedHtml]
  );

  const handleInput = () => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    if (linkUrl) {
      restoreSelection();
      execCommand("createLink", linkUrl);

      // Ensure links behave as expected on the site
      const sel = window.getSelection();
      const node = sel?.anchorNode;
      const el = (node && node.nodeType === Node.ELEMENT_NODE
        ? (node as Element)
        : node?.parentElement) as Element | null;
      const anchor = el?.closest("a") as HTMLAnchorElement | null;
      if (anchor) {
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
      }

      setLinkUrl("");
      setLinkDialogOpen(false);
    }
  };

  const insertYouTube = () => {
    if (youtubeUrl) {
      restoreSelection();
      // Extract video ID from various YouTube URL formats
      const videoId = youtubeUrl.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/
      )?.[1];

      if (videoId) {
        const iframe = `<div class="youtube-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1rem 0;"><iframe src="https://www.youtube.com/embed/${videoId}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe></div>`;
        execCommand("insertHTML", iframe);
      }
      setYoutubeUrl("");
      setYoutubeDialogOpen(false);
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      restoreSelection();
      const img = `<img src="${imageUrl}" alt="Article image" style="max-width:100%;height:auto;border-radius:8px;margin:1rem 0;" />`;
      execCommand("insertHTML", img);
      setImageUrl("");
      setImageDialogOpen(false);
    }
  };

  const insertTable = () => {
    restoreSelection();
    const rows = Math.max(1, Math.min(20, tableRows));
    const cols = Math.max(1, Math.min(10, tableCols));
    
    let tableHtml = '<table class="article-table"><thead><tr>';
    for (let c = 0; c < cols; c++) {
      tableHtml += `<th>Header ${c + 1}</th>`;
    }
    tableHtml += '</tr></thead><tbody>';
    for (let r = 0; r < rows - 1; r++) {
      tableHtml += '<tr>';
      for (let c = 0; c < cols; c++) {
        tableHtml += '<td>Cell</td>';
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table><p></p>';
    
    execCommand("insertHTML", tableHtml);
    setTableRows(3);
    setTableCols(3);
    setTableDialogOpen(false);
  };

  const formatBlock = (tag: string) => {
    execCommand("formatBlock", tag);
  };

  const ToolbarButton = ({
    onClick,
    children,
    title,
  }: {
    onClick: () => void;
    children: React.ReactNode;
    title: string;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      title={title}
      className="h-8 w-8 p-0"
    >
      {children}
    </Button>
  );

  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/50">
        {/* History */}
        <ToolbarButton onClick={() => execCommand("undo")} title="Undo">
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand("redo")} title="Redo">
          <Redo className="h-4 w-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Headings */}
        <ToolbarButton onClick={() => formatBlock("h1")} title="Heading 1">
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => formatBlock("h2")} title="Heading 2">
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => formatBlock("h3")} title="Heading 3">
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Text formatting */}
        <ToolbarButton onClick={() => execCommand("bold")} title="Bold">
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand("italic")} title="Italic">
          <Italic className="h-4 w-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Lists */}
        <ToolbarButton onClick={() => execCommand("insertUnorderedList")} title="Bullet List">
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand("insertOrderedList")} title="Numbered List">
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Block elements */}
        <ToolbarButton onClick={() => formatBlock("blockquote")} title="Quote">
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => formatBlock("pre")} title="Code Block">
          <Code className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand("insertHorizontalRule")} title="Horizontal Line">
          <Minus className="h-4 w-4" />
        </ToolbarButton>

        {/* Table dialog */}
        <Dialog open={tableDialogOpen} onOpenChange={setTableDialogOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              title="Insert Table"
              onMouseDown={() => saveSelection()}
            >
              <Table className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Table</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="table-rows">Rows</Label>
                  <Input
                    id="table-rows"
                    type="number"
                    min={1}
                    max={20}
                    value={tableRows}
                    onChange={(e) => setTableRows(parseInt(e.target.value) || 3)}
                  />
                </div>
                <div>
                  <Label htmlFor="table-cols">Columns</Label>
                  <Input
                    id="table-cols"
                    type="number"
                    min={1}
                    max={10}
                    value={tableCols}
                    onChange={(e) => setTableCols(parseInt(e.target.value) || 3)}
                  />
                </div>
              </div>
              <Button onClick={insertTable} className="w-full">
                Insert Table
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Link dialog */}
          <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                title="Insert Link"
                onMouseDown={() => saveSelection()}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="link-url">URL</Label>
                <Input
                  id="link-url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <Button onClick={insertLink} className="w-full">
                Insert Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* YouTube dialog */}
          <Dialog open={youtubeDialogOpen} onOpenChange={setYoutubeDialogOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                title="Embed YouTube Video"
                onMouseDown={() => saveSelection()}
              >
                <Youtube className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Embed YouTube Video</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="youtube-url">YouTube URL</Label>
                <Input
                  id="youtube-url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              <Button onClick={insertYouTube} className="w-full">
                Embed Video
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Image dialog */}
          <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                title="Insert Image"
                onMouseDown={() => saveSelection()}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <Button onClick={insertImage} className="w-full">
                Insert Image
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onPaste={handlePaste}
        onInput={handleInput}
        className="cms-richtext min-h-[300px] p-4 focus:outline-none bg-background text-foreground prose prose-sm max-w-none dark:prose-invert [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_a]:text-primary [&_a]:underline [&_.article-table]:w-full [&_.article-table]:border-collapse [&_.article-table]:my-4 [&_.article-table_th]:border [&_.article-table_th]:border-border [&_.article-table_th]:bg-muted [&_.article-table_th]:px-3 [&_.article-table_th]:py-2 [&_.article-table_th]:text-left [&_.article-table_th]:font-semibold [&_.article-table_td]:border [&_.article-table_td]:border-border [&_.article-table_td]:px-3 [&_.article-table_td]:py-2"
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />

      {/* Placeholder styling */}
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: hsl(var(--muted-foreground));
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;

