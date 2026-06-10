 import Navigation from "@/components/Navigation";
 import Footer from "@/components/Footer";
 import { Button } from "@/components/ui/button";
 import { CalendarCheck, Shield, Users, FileSearch, ArrowRight } from "lucide-react";
 import { Link } from "react-router-dom";
 
 const MeetingConfirmation = () => {
   const benefits = [
     {
       icon: FileSearch,
       title: "Case Assessment",
       description: "We'll review your situation and determine the best approach for recovery"
     },
     {
       icon: Shield,
       title: "Expert Guidance",
       description: "Get insights from specialists with deep blockchain forensics experience"
     },
     {
       icon: Users,
       title: "Partner Network",
       description: "Access to vetted legal professionals and recovery specialists if needed"
     }
   ];
 
   return (
     <div className="min-h-screen flex flex-col bg-background">
       <Navigation />
       
       <main className="flex-1 flex items-center justify-center px-4 py-16">
         <div className="max-w-3xl w-full text-center space-y-12">
           {/* Success Icon */}
           <div className="flex justify-center">
             <div className="rounded-full bg-primary/10 p-6">
               <CalendarCheck className="h-16 w-16 text-primary" />
             </div>
           </div>
 
           {/* Main Message */}
           <div className="space-y-4">
             <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
               Your Consultation is Booked
             </h1>
             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
               Thank you for scheduling a call with our team. We're looking forward to learning about your case and exploring how we can help.
             </p>
           </div>
 
           {/* What to Expect */}
           <div className="bg-card border rounded-2xl p-8 md:p-10">
             <h2 className="text-2xl font-semibold mb-8">What to Expect</h2>
             <div className="grid md:grid-cols-3 gap-8">
               {benefits.map((benefit, index) => (
                 <div key={index} className="text-left space-y-3">
                   <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                     <benefit.icon className="h-6 w-6 text-primary" />
                   </div>
                   <h3 className="font-semibold text-lg">{benefit.title}</h3>
                   <p className="text-muted-foreground text-sm leading-relaxed">
                     {benefit.description}
                   </p>
                 </div>
               ))}
             </div>
           </div>
 
           {/* Confirmation Details */}
           <div className="bg-muted/50 rounded-xl p-6 text-left space-y-3">
             <p className="text-muted-foreground">
               <strong className="text-foreground">Check your inbox:</strong> You'll receive a calendar invite with the meeting link and details shortly.
             </p>
             <p className="text-muted-foreground">
               <strong className="text-foreground">Prepare your case:</strong> Have any relevant transaction IDs, wallet addresses, or documentation ready for our discussion.
             </p>
           </div>
 
           {/* CTA */}
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button asChild size="lg">
               <Link to="/">
                 Return to Home
                 <ArrowRight className="ml-2 h-4 w-4" />
               </Link>
             </Button>
             <Button asChild variant="outline" size="lg">
               <Link to="/insights">Explore Our Insights</Link>
             </Button>
           </div>
         </div>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default MeetingConfirmation;