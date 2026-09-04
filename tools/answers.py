"""Generates /answers/ : a hub plus question-titled articles written to be
cited by AI answer engines. Every article: question as H1, a direct answer
with numbers first, an 'In numbers' strip, short sections, an FAQ mirrored
into FAQPage JSON-LD, related links to sibling articles, and a CTA to the
relevant product page. All figures are from the approved list only."""
import json, re, os, html as H

ROOT = __import__("os").path.join(__import__("os").path.dirname(__import__("os").path.abspath(__file__)), "..", "public", "answers") + "/"
SITE = "https://www.blockquery.io"
DATE = "2026-09-04"
DATE_H = "4 September 2026"

ORG = {"@type": "Organization", "@id": SITE + "/#org", "name": "BlockQuery", "url": SITE + "/",
       "logo": {"@type": "ImageObject", "url": SITE + "/sig-logo.png"},
       "parentOrganization": {"@type": "Organization", "name": "Chainlabs", "url": "https://chainlabs.ai/"}}

CTA_HOME = ("Start with a first report", "/#start",
            "OTC VIP monitoring: your counterparties, watched continuously, reported weekly or monthly.")
CTA_DATA = ("Request one month of sample data", "/data#request",
            "Entity data feeds: the attribution layer as data you own, in the schema you would receive.")

A = {}

A["what-is-on-chain-entity-attribution"] = dict(
 title="What is on-chain entity attribution?",
 desc="Entity attribution names the real-world entity behind a blockchain address. BlockQuery's layer names 18,000 commercial entities across 30+ blockchains, human-verified with source evidence.",
 lead="On-chain entity attribution is the work of naming the real-world entity behind a blockchain address: the exchange, OTC desk, fund, miner, treasury or issuer that controls it. BlockQuery's attribution layer, built by Chainlabs over six years, names <b>18,000 commercial entities across 30+ blockchains</b>, with every attribution human-verified and backed by source evidence.",
 nums=[("18,000","commercial entities"),("800+","OTC desks"),("30+","blockchains"),("90,000","directly researched addresses")],
 sections=[
  ("Why an address is not an answer",
   "Every blockchain shows what moved, when, and between which addresses. It does not show who. A transfer of 400 BTC from one string to another is a fact without a subject. Attribution supplies the subject, so the same transfer reads as a desk moving size onto a venue."),
  ("How addresses get attributed",
   "There are two layers. <b>Direct research</b>: analysts establish who controls an address from verifiable evidence such as deposit behaviour, published addresses and operational patterns. 90,000 addresses carry this kind of direct attribution. <b>Entity clustering</b>: once a set of addresses is known to belong to one entity, the way they are spent together extends the same attribution to the addresses that move with them. Hundreds of millions of addresses are attributed this way: 312M+ on Bitcoin, 47M+ on Ethereum and 94.4M+ on Tron. Every attribution is human-verified by a team of intelligence analysts and carries source evidence, and the layer grows by around 300 new attributions a month."),
  ("What it looks like as data",
   'A record: size, source entity, destination entity, the transaction date, and the date the attribution was established. Both sides named where we have them. That last field is what makes the data safe to backtest against; see <a href="/answers/what-is-point-in-time-attribution/">point-in-time attribution</a>.'),
  ("What it is used for",
   'Trading desks use it to read flow with names attached: which desk moved size onto which venue, <a href="/answers/where-does-a-stablecoin-mint-go/">where a stablecoin mint landed</a>, whether a counterparty has started routing elsewhere. It is data, not a signal. It does not predict price.'),
 ],
 faq=[
  ("Is entity attribution the same as address clustering?",
   "No. Clustering groups addresses that appear to be controlled together. Attribution goes further and names the controller, with evidence. Clustering tells you two addresses belong to the same someone; attribution tells you who."),
  ("How is accuracy maintained?",
   "Every attribution in the BlockQuery layer is human-verified by intelligence analysts and carries verifiable source evidence, rather than being inferred by an algorithm alone. Each attribution also carries the date it was established, so you can always see what was known when."),
  ("Which kinds of entity are covered?",
   "Exchanges, OTC desks, funds, miners, corporate treasuries, ETF issuers and stablecoin issuers: 18,000 commercial entities in total, including 800+ OTC desks and 480+ regional exchanges."),
  ("Can I get it as a data feed?",
   "Yes. Multi-year history as CSV or parquet, plus a live API in the identical schema. Bitcoin first, additional chains on request."),
 ],
 related=["how-many-otc-desks-are-there-in-crypto","what-is-point-in-time-attribution","who-sent-a-bitcoin-transaction-before-it-confirms"],
 cta=CTA_DATA)

A["how-many-otc-desks-are-there-in-crypto"] = dict(
 title="How many OTC desks are there in crypto?",
 desc="There is no public register of crypto OTC desks. BlockQuery has attributed 800+ OTC desks on-chain, alongside 480+ regional exchanges, within a layer of 18,000 commercial entities.",
 lead="There is no public register of crypto OTC desks, so no true census exists. What can be evidenced is this: <b>BlockQuery has attributed 800+ OTC desks on-chain</b>, alongside 480+ regional exchanges, within an attribution layer of 18,000 commercial entities. That figure is a floor, not an estimate of the market.",
 nums=[("800+","OTC desks attributed"),("480+","regional exchanges"),("18,000","commercial entities"),("30+","blockchains")],
 sections=[
  ("Why the number is hard to pin down",
   "OTC desks are not listed venues. Many are units inside larger firms, some are regional operators serving a single market, and a desk does not announce its addresses. Any count is a count of what has been identified, not of what exists."),
  ("How BlockQuery counts them",
   "A desk enters the count only when its on-chain addresses have been attributed through direct research, with verifiable source evidence, and verified by an analyst. The 800+ figure is therefore the number of desks we can name and evidence today. It grows as the layer grows, at around 300 new attributions a month across all entity types."),
  ("Why the count matters to a trading desk",
   'OTC flow is the part of the market a desk cannot see from its own book. Knowing which desks exist on-chain is the precondition for seeing which of them your own counterparties also trade with. That is the question <a href="/answers/how-can-an-otc-desk-monitor-its-counterparties/">OTC VIP monitoring</a> answers.'),
  ("Regional venues are the other half",
   'Alongside the desks sit 480+ regional exchanges, many running on stablecoin rails across LatAm, Africa and Asia, which are largely unattributed elsewhere. They matter for the same reason: they are where flow goes when it does not come to you. See <a href="/answers/where-does-a-stablecoin-mint-go/">where a stablecoin mint actually goes</a>.'),
 ],
 faq=[
  ("Is 800 the total number of OTC desks in crypto?",
   "No. It is the number BlockQuery has attributed and can evidence. The true total is unknown and is likely higher."),
  ("How often is the count updated?",
   "Continuously. Around 300 new attributions are added to the layer each month across all entity types, and the desk count moves with it."),
  ("Can I see which desks my counterparties trade with?",
   "Yes. That is what OTC VIP monitoring does: you set a coverage list of counterparties, and the report names the desks and venues they route through."),
  ("Can I get the desk attributions as data?",
   "Yes, as part of the entity data feeds: history as CSV or parquet and a live API in the identical schema."),
 ],
 related=["what-is-on-chain-entity-attribution","how-can-an-otc-desk-monitor-its-counterparties","where-does-a-stablecoin-mint-go"],
 cta=CTA_HOME)

A["what-is-point-in-time-attribution"] = dict(
 title="What is point-in-time attribution, and why do backtests need it?",
 desc="Point-in-time attribution records when each attribution was established. Query March 2025 and you see only what was knowable then, so a backtest is not contaminated by hindsight.",
 lead="Point-in-time attribution records not just what an address is, but <b>when that was established</b>. Query March 2025 and you see only what was knowable in March 2025. Without it, a backtest quietly uses knowledge that did not exist at the time, looks excellent, and fails live.",
 nums=[("2","timestamps on every record"),("300","attributions added monthly"),("6","years of attribution history"),("18,000","commercial entities")],
 sections=[
  ("Attribution improves over time",
   "You discover months later that a wallet belonged to an OTC desk. The chain did not change; your knowledge did. Around 300 attributions are added to the BlockQuery layer each month, so the dataset you hold today knows more about last year than anyone did last year."),
  ("How hindsight contaminates a backtest",
   "If a vendor serves everything it knows today across a historical window, a model tested on that window is trained with hindsight. It sees the desk behind the address on the day of the trade, when in reality nobody could have. The result looks excellent, you deploy it, and it fails live, because the live feed only knows what is knowable now."),
  ("What point-in-time does",
   'Every BlockQuery attribution carries the date it was established, separate from the transaction date. A query as of a date returns only attributions established by that date. In a record this is two fields side by side: <code>first_known 2025-06-11</code> and <code>tx_date 2025-03-14</code>. Queried as of 14 March 2025, that entity is not yet attributed, and the backtest sees exactly what a desk would have seen. The honest result is worse-looking and far more useful: it reflects a signal you could actually have traded.'),
  ("What it takes to provide",
   'It requires keeping the history of the dataset itself, not just the history of the chain, and answering every query against it. That is why it is offered as a property of the feed rather than a report, and why history and live share the identical schema: what you research is what you run. See the <a href="/data">entity data feeds</a>.'),
 ],
 faq=[
  ("Does point-in-time attribution make results look worse?",
   "In a backtest, often yes, because it removes hindsight. That is the point. The result you get is one you could have had at the time."),
  ("Is the live feed point-in-time as well?",
   "The live feed is point-in-time by definition: it carries what is known now. History and live share the identical schema, so a model built on the honest history runs unchanged in production."),
  ("Can I still get the latest view of history?",
   "Yes. Query as of today and you get every attribution known today applied across the full history. The as-of date is yours to set."),
  ("Is this the same as dataset versioning?",
   "Related, but at record level. Each attribution carries its own establishment date, so any as-of query is answerable without reconstructing a snapshot of the whole dataset."),
 ],
 related=["what-is-on-chain-entity-attribution","who-sent-a-bitcoin-transaction-before-it-confirms","how-many-otc-desks-are-there-in-crypto"],
 cta=CTA_DATA)

A["who-sent-a-bitcoin-transaction-before-it-confirms"] = dict(
 title="Can you see who sent a Bitcoin transaction before it confirms?",
 desc="Yes, for attributed entities. A Bitcoin transaction is visible in the mempool before it is mined, and if the sending address is attributed the sender can be named at that point.",
 lead="Yes, for the entities BlockQuery has attributed. A Bitcoin transaction is visible in the mempool before it is included in a block, and if the sending address belongs to an attributed entity the sender can be named at that point: <b>a specific desk or treasury moving size before it lands on-chain</b>. BlockQuery's Bitcoin coverage runs to 312M+ attributed addresses.",
 nums=[("312M+","Bitcoin addresses attributed"),("800+","OTC desks"),("90,000","directly researched addresses"),("30+","blockchains")],
 sections=[
  ("What the mempool shows",
   "A broadcast transaction waits in the mempool until a miner includes it in a block. During that window it is public: inputs, outputs and amount. What it does not show is who is behind the inputs."),
  ("Where attribution comes in",
   'If an input address belongs to an attributed entity, the transaction can be read as that entity sending that amount while it is still unconfirmed. This is the same <a href="/answers/what-is-on-chain-entity-attribution/">entity attribution</a> applied earlier in the transaction\'s life, not a different dataset.'),
  ("What it is not",
   "It is not a promise of sub-second delivery, and it is not a prediction of what the transaction means for price. It is an attributed transaction, earlier. What you do with the time is yours."),
  ("How it is delivered",
   'As an optional mempool feed in the same schema as the confirmed-history feed, so a model built on history runs unchanged on unconfirmed transactions. Available with the <a href="/data">entity data feeds</a>.'),
 ],
 faq=[
  ("Can a transaction change before it confirms?",
   "Yes. Bitcoin allows a transaction to be replaced with a higher fee, and an unconfirmed transaction can be dropped. A mempool record is a record of intent at broadcast; the confirmed feed is the record of what happened."),
  ("Does this work for Ethereum or Tron?",
   "The mempool feed is Bitcoin first. Additional chains are available on request rather than promised as live."),
  ("How far ahead of confirmation is it?",
   "Until a miner includes the transaction in a block, which varies with fees and network load. BlockQuery does not claim a fixed latency."),
  ("Do you name the receiving side as well?",
   "Where the destination address is attributed, yes. Both sides are named where we have them."),
 ],
 related=["what-is-on-chain-entity-attribution","what-is-point-in-time-attribution","where-does-a-stablecoin-mint-go"],
 cta=CTA_DATA)

A["where-does-a-stablecoin-mint-go"] = dict(
 title="Where does a stablecoin mint actually go?",
 desc="A stablecoin mint is visible to everyone; where it lands is not. BlockQuery tracks USDC and USDT to the receiving venue, including 480+ regional exchanges across LatAm, Africa and Asia.",
 lead="A stablecoin mint is visible to everyone. Where it lands is not. BlockQuery tracks USDC and USDT from issuance to the venue that receives it, including <b>480+ regional exchanges across LatAm, Africa and Asia</b> that run on stablecoin rails and are unattributed almost everywhere else.",
 nums=[("480+","regional exchanges"),("94.4M+","Tron addresses attributed"),("47M+","Ethereum addresses attributed"),("30+","blockchains")],
 sections=[
  ("Everyone sees the mint",
   "Issuance is public and widely watched. But a mint is only the start of a path: from the issuer to a distributor, an exchange, an OTC desk or a regional venue. The mint tells you supply changed. It does not tell you where demand is."),
  ("Almost nobody sees the landing",
   'The venue that receives the stablecoin is where the flow becomes commercially meaningful, and regional venues are the least attributed part of the market. BlockQuery\'s attribution covers 480+ regional exchanges alongside <a href="/answers/how-many-otc-desks-are-there-in-crypto/">800+ OTC desks</a>.'),
  ("Why Tron matters",
   "USDT circulates heavily on Tron, so a stablecoin picture that stops at Ethereum misses a large part of the rails regional venues actually use. BlockQuery's Tron coverage runs to 94.4M+ attributed addresses, alongside 47M+ on Ethereum."),
  ("Reading it as data",
   'Each transfer is a record with the issuer or sender on one side and the receiving venue on the other, timestamped and <a href="/answers/what-is-point-in-time-attribution/">point-in-time attributed</a>. It is the same <a href="/answers/what-is-on-chain-entity-attribution/">entity attribution</a> that names Bitcoin flow, applied to stablecoin rails.'),
 ],
 faq=[
  ("Which stablecoins are covered?",
   "USDC and USDT, tracked to the venue that receives them."),
  ("Do you see redemptions as well as mints?",
   "The attribution layer names entities on both sides of any transfer, so flows back towards an issuer are visible in the same way as flows out."),
  ("Which regions are covered?",
   "Regional exchanges across LatAm, Africa and Asia are explicitly covered, among the 480+ regional venues attributed."),
  ("Is this available as a live feed?",
   "Yes. Multi-year history as CSV or parquet, plus a live API in the identical schema, with the entity data feeds."),
 ],
 related=["what-is-on-chain-entity-attribution","how-many-otc-desks-are-there-in-crypto","who-sent-a-bitcoin-transaction-before-it-confirms"],
 cta=CTA_DATA)

A["how-can-an-otc-desk-monitor-its-counterparties"] = dict(
 title="How can an OTC desk see what its counterparties do on other venues?",
 desc="An OTC desk sees its own fills and nothing else. BlockQuery's OTC VIP monitoring tracks a coverage list of counterparties across 30+ blockchains and reports weekly or monthly on where they trade elsewhere.",
 lead="An OTC desk sees its own fills and nothing else. To see what a counterparty does elsewhere, its on-chain activity has to be attributed and watched over time. <b>BlockQuery's OTC VIP monitoring does exactly that</b>: a coverage list you set, tracked continuously across 30+ blockchains, reported in writing weekly or monthly.",
 nums=[("30+","blockchains watched"),("800+","OTC desks attributed"),("Weekly","or monthly reports"),("Fixed","monthly fee")],
 sections=[
  ("The blind spot",
   "Your book shows the volume a counterparty does with you. It shows nothing about the volume they do with anyone else, which venues they use, or whether that mix is changing. On-chain, all of that is visible, provided the entities on the other side are named."),
  ("What monitoring shows",
   'Three things, mapped to a sales outcome. <b>Grow</b>: a counterparty may be moving several times on-chain what they trade with you; the report shows that gap, account by account. <b>Win</b>: named entities moving real size through venues you compete with, volumes attached, not yet trading with you. <b>Keep</b>: when a counterparty starts routing to another desk, it shows on-chain before it shows in your volumes. The <a href="/answers/how-many-otc-desks-are-there-in-crypto/">800+ attributed OTC desks</a> are what make the second and third visible.'),
  ("How it works",
   'You send the list of accounts and prospects to monitor, with no systems access and no integration. BlockQuery tracks them continuously against its <a href="/answers/what-is-on-chain-entity-attribution/">attribution layer</a>. You receive a written report weekly or monthly covering what changed and what it means. Anything that warrants a closer look can be escalated to a deeper investigation.'),
  ("What it is not",
   'It is not a data feed and not a dashboard. There is nothing to integrate and no licence to negotiate. It is priced as a fixed monthly fee, not per account or per query. If you want the underlying attribution as a feed to run yourself, that is a separate product: the <a href="/data">entity data feeds</a>.'),
 ],
 faq=[
  ("What do we need to share?",
   "A list of the counterparties and prospects to monitor. No systems access, no integration. The coverage list is yours and you can change it."),
  ("How often does the report arrive?",
   "Weekly or monthly, whichever suits your desk."),
  ("Is it priced per account?",
   "No. A fixed monthly fee, not priced per account or per query. Pricing is shared on request."),
  ("Can a finding be investigated further?",
   "Yes. Anything that warrants a closer look can be escalated to a deeper investigation."),
 ],
 related=["how-many-otc-desks-are-there-in-crypto","what-is-on-chain-entity-attribution","where-does-a-stablecoin-mint-go"],
 cta=CTA_HOME)

ORDER = ["what-is-on-chain-entity-attribution","how-can-an-otc-desk-monitor-its-counterparties",
         "how-many-otc-desks-are-there-in-crypto","where-does-a-stablecoin-mint-go",
         "who-sent-a-bitcoin-transaction-before-it-confirms","what-is-point-in-time-attribution"]

# ---------------------------------------------------------------- template
HEAD = """<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{title} | BlockQuery</title>
<meta name="description" content="{desc}" />
<link rel="canonical" href="{url}" />
<meta name="theme-color" content="#0B0E14" />
<meta property="og:type" content="{ogtype}" />
<meta property="og:site_name" content="BlockQuery" />
<meta property="og:url" content="{url}" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{desc}" />
<meta property="og:image" content="https://www.blockquery.io/og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{desc}" />
<meta name="twitter:image" content="https://www.blockquery.io/og.png" />
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-821HBV4DF8"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());
  gtag('config', 'G-821HBV4DF8');
</script>
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="alternate icon" type="image/x-icon" href="/favicon.ico" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap" />
<style>
:root{{ --canvas:#0B0E14; --raised:#0F141D; --border:#2A3445; --white:#FFFFFF; --body:#E4E8EF;
  --muted:#8A94A6; --faint:#5C6678; --accent:#19C3D6;
  --mono:"IBM Plex Mono","Cascadia Mono",Consolas,Menlo,"DejaVu Sans Mono",monospace;
  --display:"Newsreader",Georgia,"Times New Roman",serif; --gut:clamp(20px,5vw,64px); --maxw:1140px; }}
*,*::before,*::after{{ box-sizing:border-box; }}
html{{ -webkit-text-size-adjust:100%; }}
body{{ margin:0; background:var(--canvas); color:var(--body); font-family:var(--mono); font-size:15px;
  line-height:1.7; font-variant-numeric:tabular-nums; -webkit-font-smoothing:antialiased; overflow-x:hidden; }}
h1,h2{{ font-family:var(--display); font-weight:500; color:var(--white); letter-spacing:-0.015em; line-height:1.08; margin:0; }}
p{{ margin:0; }} a{{ color:inherit; }}
.wrap{{ width:100%; max-width:var(--maxw); margin:0 auto; padding:0 var(--gut); }}
.narrow{{ max-width:72ch; }}
:focus-visible{{ outline:2px solid var(--accent); outline-offset:3px; }}
.skip{{ position:absolute; left:-9999px; top:0; z-index:99; background:var(--accent); color:var(--canvas); padding:10px 16px; font-weight:500; }}
.skip:focus{{ left:0; }}
.rail{{ border-bottom:1px solid var(--border); }}
.rail-in{{ display:flex; align-items:center; justify-content:space-between; gap:16px; height:46px;
  font-size:11px; letter-spacing:.16em; text-transform:uppercase; }}
.rail-id{{ color:var(--white); font-weight:500; text-transform:none; letter-spacing:0; font-size:13.5px; text-decoration:none; }}
.rail-id span{{ color:var(--muted); font-weight:400; font-size:11px; letter-spacing:.16em; text-transform:uppercase; }}
.rail a{{ color:var(--muted); text-decoration:none; }} .rail a:hover{{ color:var(--white); }}
.rail-nav{{ display:flex; align-items:center; gap:clamp(16px,2.6vw,30px); }} .rail-nav .on{{ color:var(--white); }}
.crumb{{ font-size:10.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--muted); margin:clamp(40px,5.5vw,64px) 0 clamp(18px,2.4vw,26px); }}
.crumb a{{ text-decoration:none; }} .crumb a:hover{{ color:var(--white); }}
h1{{ font-size:clamp(30px,4.8vw,50px); max-width:22ch; }}
.lead{{ margin-top:clamp(18px,2.4vw,26px); font-size:clamp(15.5px,1.6vw,17.5px); line-height:1.7; color:var(--body); }}
.lead b{{ color:var(--white); font-weight:500; }}
.meta{{ margin-top:18px; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); }}
.nums{{ display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(16px,3vw,40px); margin:clamp(30px,4vw,44px) 0;
  padding:clamp(20px,2.6vw,28px) 0; border-top:1px solid var(--border); border-bottom:1px solid var(--border); }}
.num .v{{ color:var(--white); font-size:clamp(20px,3vw,30px); line-height:1; }}
.num .k{{ color:var(--muted); font-size:11px; letter-spacing:.14em; text-transform:uppercase; margin-top:10px; line-height:1.5; }}
article h2{{ font-size:clamp(22px,3vw,30px); margin:clamp(30px,4vw,44px) 0 12px; }}
article p{{ color:var(--body); }} article p b{{ color:var(--white); font-weight:500; }}
article p a, .faq a{{ color:var(--body); text-decoration:none; border-bottom:1px solid var(--muted); }}
article code{{ font-family:var(--mono); color:var(--accent); font-size:.95em; }}
.faq{{ margin-top:clamp(36px,5vw,56px); }}
.faq .qa{{ border-top:1px solid var(--border); margin-top:14px; }}
.faq .q{{ padding:clamp(16px,2.2vw,22px) 0; border-bottom:1px solid var(--border); }}
.faq h3{{ margin:0 0 8px; font-family:var(--mono); font-weight:500; font-size:14.5px; color:var(--white); line-height:1.5; }}
.faq p{{ color:var(--muted); font-size:13.5px; }}
.related{{ margin-top:clamp(36px,5vw,56px); }}
.related ul{{ list-style:none; margin:14px 0 0; padding:0; border-top:1px solid var(--border); }}
.related li{{ border-bottom:1px solid var(--border); }}
.related a{{ display:flex; justify-content:space-between; gap:20px; padding:14px 0; text-decoration:none; color:var(--body); font-size:14px; }}
.related a:hover{{ color:var(--white); }} .related span{{ color:var(--muted); }}
.band{{ margin:clamp(40px,5.5vw,64px) 0; background:var(--raised); border:1px solid var(--border); padding:clamp(24px,3.2vw,40px);
  display:grid; grid-template-columns:minmax(0,1fr) max-content; gap:20px 40px; align-items:center; }}
.band h2{{ font-size:clamp(20px,2.6vw,28px); margin:0; }}
.band p{{ color:var(--muted); font-size:13.5px; margin-top:8px; max-width:56ch; }}
.btn{{ display:inline-flex; align-items:center; justify-content:center; font-family:var(--mono); font-size:12.5px; font-weight:500;
  letter-spacing:.14em; text-transform:uppercase; text-decoration:none; padding:15px 26px; background:var(--accent); color:var(--canvas); white-space:nowrap; }}
.btn:hover{{ opacity:.86; }}
.hub li a{{ display:block; padding:clamp(18px,2.4vw,24px) 0; text-decoration:none; border-bottom:1px solid var(--border); }}
.hub ul{{ list-style:none; margin:clamp(26px,3.4vw,38px) 0 0; padding:0; border-top:1px solid var(--border); }}
.hub .t{{ display:block; font-family:var(--display); font-size:clamp(20px,2.6vw,26px); color:var(--white); line-height:1.15; letter-spacing:-.01em; }}
.hub .d{{ display:block; color:var(--muted); font-size:13.5px; margin-top:8px; max-width:70ch; }}
.hub li a:hover .t{{ color:var(--accent); }}
footer{{ border-top:1px solid var(--border); padding:30px 0 44px; margin-top:clamp(40px,5.5vw,64px); }}
.foot-in{{ display:flex; flex-wrap:wrap; justify-content:space-between; gap:12px 24px; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); }}
.foot-in a{{ color:var(--muted); text-decoration:none; }} .foot-in a:hover{{ color:var(--white); }}
.foot-nav{{ display:flex; gap:22px; }}
.fb{{ text-transform:none; letter-spacing:0; font-size:12.5px; font-weight:500; color:var(--body); }}
@media (max-width:860px){{ .nums{{ grid-template-columns:repeat(2,1fr); }} .band{{ grid-template-columns:1fr; }} .band > *{{ min-width:0; }} .band .btn{{ white-space:normal; text-align:center; width:100%; }} }}
@media (max-width:560px){{ .rail-in .rail-cta{{ display:none; }} .rail-id span{{ display:none; }} .nums{{ grid-template-columns:1fr; gap:16px; }} }}
</style>
{ld}</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="rail">
  <div class="wrap rail-in">
    <a class="rail-id" href="/">BlockQuery <span>powered by Chainlabs.ai</span></a>
    <nav class="rail-nav">
      <a href="/">OTC VIP Monitoring</a>
      <a href="/data">Entity data</a>
      <a class="on" href="/answers/" aria-current="{cur}">Answers</a>
    </nav>
  </div>
</header>
<main id="main">
"""

FOOT = """</main>
<footer>
  <div class="wrap foot-in">
    <span><b class="fb">BlockQuery</b> &middot; powered by Chainlabs</span>
    <nav class="foot-nav"><a href="/">OTC VIP monitoring</a><a href="/data">Entity data</a><a href="/answers/">Answers</a></nav>
  </div>
</footer>
</body>
</html>
"""

def ld(graph):
    return '<script type="application/ld+json">%s</script>\n' % json.dumps({"@context":"https://schema.org","@graph":graph}, ensure_ascii=False)

def strip(s): return re.sub(r"<[^>]+>", "", s)

def article(slug, a):
    url = "%s/answers/%s/" % (SITE, slug)
    graph = [ORG,
     {"@type":"Article","@id":url+"#article","headline":a["title"],"description":a["desc"],
      "datePublished":DATE,"dateModified":DATE,"inLanguage":"en-GB",
      "author":{"@id":SITE+"/#org"},"publisher":{"@id":SITE+"/#org"},
      "mainEntityOfPage":url,"image":SITE+"/og.png"},
     {"@type":"BreadcrumbList","itemListElement":[
        {"@type":"ListItem","position":1,"name":"BlockQuery","item":SITE+"/"},
        {"@type":"ListItem","position":2,"name":"Answers","item":SITE+"/answers/"},
        {"@type":"ListItem","position":3,"name":a["title"],"item":url}]},
     {"@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":strip(ans)}} for q,ans in a["faq"]]}]
    out=[HEAD.format(title=H.escape(a["title"],quote=True), desc=H.escape(a["desc"],quote=True), url=url, ogtype="article", ld=ld(graph), cur="false")]
    out.append('<article class="wrap">\n<div class="narrow">')
    out.append('<p class="crumb"><a href="/answers/">Answers</a> &nbsp;/&nbsp; %s</p>' % DATE_H)
    out.append('<h1>%s</h1>' % a["title"])
    out.append('<p class="lead">%s</p>' % a["lead"])
    out.append('<p class="meta">Published %s &middot; BlockQuery, powered by Chainlabs</p>' % DATE_H)
    out.append('</div>')
    out.append('<div class="nums">' + "".join('<div class="num"><div class="v">%s</div><div class="k">%s</div></div>' % (v,k) for v,k in a["nums"]) + '</div>')
    out.append('<div class="narrow">')
    for h2,p in a["sections"]:
        out.append('<h2>%s</h2>\n<p>%s</p>' % (h2,p))
    out.append('<section class="faq"><h2>Frequently asked questions</h2><div class="qa">')
    for q,ans in a["faq"]:
        out.append('<div class="q"><h3>%s</h3><p>%s</p></div>' % (q,ans))
    out.append('</div></section>')
    out.append('<aside class="related"><h2>Related answers</h2><ul>')
    for r in a["related"]:
        out.append('<li><a href="/answers/%s/">%s<span>&rarr;</span></a></li>' % (r, A[r]["title"]))
    out.append('</ul></aside>')
    label,href,blurb = a["cta"]
    out.append('<div class="band"><div><h2>%s</h2><p>%s</p></div><a class="btn" href="%s">%s</a></div>' % (
        "Next step" if False else label, blurb, href, label))
    out.append('</div>\n</article>')
    out.append(FOOT)
    return "\n".join(out)

def hub():
    url = SITE + "/answers/"
    graph = [ORG,
     {"@type":"CollectionPage","@id":url,"name":"Answers","url":url,
      "description":"Straight answers to the questions trading desks ask about on-chain entity attribution.",
      "hasPart":[{"@type":"Article","headline":A[s]["title"],"url":"%s/answers/%s/"%(SITE,s)} for s in ORDER]},
     {"@type":"BreadcrumbList","itemListElement":[
        {"@type":"ListItem","position":1,"name":"BlockQuery","item":SITE+"/"},
        {"@type":"ListItem","position":2,"name":"Answers","item":url}]}]
    out=[HEAD.format(title="Answers", desc="Straight answers to the questions trading desks ask about on-chain entity attribution, OTC desks, stablecoin flows and the Bitcoin mempool.", url=url, ogtype="website", ld=ld(graph), cur="page")]
    out.append('<section class="wrap hub"><div class="narrow">')
    out.append('<p class="crumb">Answers</p>')
    out.append('<h1>Straight answers about on-chain entity attribution.</h1>')
    out.append('<p class="lead">The questions trading desks ask, answered with the numbers first. Every figure here is one BlockQuery can evidence.</p>')
    out.append('</div><ul>')
    for s in ORDER:
        out.append('<li><a href="/answers/%s/"><span class="t">%s</span><span class="d">%s</span></a></li>' % (s, A[s]["title"], A[s]["desc"]))
    out.append('</ul></section>')
    out.append(FOOT)
    return "\n".join(out)

os.makedirs(ROOT, exist_ok=True)
open(ROOT+"index.html","w").write(hub())
for s in ORDER:
    os.makedirs(ROOT+s, exist_ok=True)
    open(ROOT+s+"/index.html","w").write(article(s, A[s]))
print("wrote hub + %d articles" % len(ORDER))

# sitemap
sm = ['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
def u(loc,pri,mod=DATE): sm.append('  <url><loc>%s</loc><lastmod>%s</lastmod><priority>%s</priority></url>'%(loc,mod,pri))
u(SITE+"/","1.0"); u(SITE+"/data","0.9"); u(SITE+"/answers/","0.8")
for s in ORDER: u("%s/answers/%s/"%(SITE,s),"0.7")
u(SITE+"/privacy","0.3"); u(SITE+"/terms","0.3")
sm.append('</urlset>')
open("/Users/gregschneider/blockquery.io website/website-investigations-chainlabs-main/public/sitemap.xml","w").write("\n".join(sm)+"\n")
print("sitemap: %d urls" % (3+len(ORDER)+2))
