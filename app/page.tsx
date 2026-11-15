"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Award, CalendarDays, Camera, Check,
  ChevronDown, ChevronLeft, ChevronRight, Clock3, Clapperboard, Film, Instagram,
  MapPin, Menu, MessageCircle, Play, Search, ShieldCheck, SlidersHorizontal,
  Sparkles, Star, Video, X, Youtube, Facebook, Linkedin, Mail, Phone, Heart,
  Users, Zap
} from "lucide-react";

type Creator = {
  id: number; name: string; role: string; category: string; location: string;
  rating: number; reviews: number; price: number; image: string; avatar: string;
  bio: string; tags: string[]; slots: string[];
};

const image = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const creators: Creator[] = [
  { id: 1, name: "Aarav Weddings", role: "Wedding Photographer", category: "Photographers", location: "Hyderabad", rating: 4.9, reviews: 128, price: 18000, image: image("photo-1519741497674-611481863552"), avatar: image("photo-1500648767791-00dcc994a43e", 180), bio: "Warm, cinematic wedding stories with a documentary eye and timeless edits.", tags: ["Wedding", "Candid", "Traditional"], slots: ["09:00 AM", "11:30 AM", "03:00 PM"] },
  { id: 2, name: "Frame Theory", role: "Cinematography Team", category: "Videographers", location: "Bengaluru", rating: 4.8, reviews: 94, price: 25000, image: image("photo-1492691527719-9d1e07e534b4"), avatar: image("photo-1506794778202-cad84cf45f1d", 180), bio: "A small film crew creating expressive visuals for weddings, brands and events.", tags: ["Films", "Events", "4K"], slots: ["10:00 AM", "01:00 PM", "04:30 PM"] },
  { id: 3, name: "Nisha Creative", role: "Video Editor", category: "Video Editors", location: "Chennai", rating: 5.0, reviews: 76, price: 4500, image: image("photo-1574717024653-61fd2cf4d44d"), avatar: image("photo-1534528741775-53994a69daeb", 180), bio: "Rhythmic edits, colour grading and social-first storytelling for modern brands.", tags: ["Editing", "Reels", "Colour"], slots: ["09:30 AM", "12:00 PM", "02:30 PM"] },
  { id: 4, name: "The Light Room", role: "Photography Studio", category: "Studios", location: "Kurnool", rating: 4.9, reviews: 61, price: 8000, image: image("photo-1516035069371-29a1b244cc32"), avatar: image("photo-1507003211169-0a1dd7228f2d", 180), bio: "A creative studio for portraits, product shoots and intimate celebrations.", tags: ["Studio", "Portraits", "Products"], slots: ["10:00 AM", "12:30 PM", "05:00 PM"] },
  { id: 5, name: "Rohan Visuals", role: "Drone Videographer", category: "Videographers", location: "Vijayawada", rating: 4.7, reviews: 52, price: 12000, image: image("photo-1474302770737-173ee21bab63"), avatar: image("photo-1506794778202-cad84cf45f1d", 180), bio: "Aerial perspectives and dynamic event coverage with a cinematic finish.", tags: ["Drone", "Aerial", "Events"], slots: ["08:30 AM", "11:00 AM", "03:30 PM"] },
  { id: 6, name: "Mira Moments", role: "Pre-wedding Photographer", category: "Photographers", location: "Hyderabad", rating: 4.9, reviews: 113, price: 15000, image: image("photo-1537633552985-df8429e8048b"), avatar: image("photo-1544005313-94ddf0286df2", 180), bio: "Relaxed, story-led pre-wedding sessions in beautiful outdoor locations.", tags: ["Pre-wedding", "Couples", "Outdoor"], slots: ["09:00 AM", "01:30 PM", "04:00 PM"] },
  { id: 7, name: "Pixel & Grain", role: "Commercial Photographer", category: "Photographers", location: "Bengaluru", rating: 4.8, reviews: 88, price: 9500, image: image("photo-1542038784456-1ea8e935640e"), avatar: image("photo-1500648767791-00dcc994a43e", 180), bio: "Product and campaign photography that gives ambitious brands a distinct voice.", tags: ["Commercial", "Product", "Brand"], slots: ["10:30 AM", "01:00 PM", "04:00 PM"] },
  { id: 8, name: "Motion House", role: "Video Production Team", category: "Studios", location: "Visakhapatnam", rating: 4.9, reviews: 102, price: 22000, image: image("photo-1492619375914-88005aa9e8fb"), avatar: image("photo-1506794778202-cad84cf45f1d", 180), bio: "End-to-end production for launch films, events and memorable brand stories.", tags: ["Production", "Brand films", "Crew"], slots: ["09:00 AM", "12:00 PM", "03:00 PM"] }
];

const categories = [
  { title: "Wedding Photography", desc: "Real moments, beautifully remembered.", icon: Camera, img: image("photo-1519741497674-611481863552") },
  { title: "Event Videography", desc: "Bring every celebration back to life.", icon: Video, img: image("photo-1492691527719-9d1e07e534b4") },
  { title: "Video Editing", desc: "Shape raw footage into a story.", icon: Film, img: image("photo-1574717024653-61fd2cf4d44d") },
  { title: "Photography Studios", desc: "A space for ideas to take shape.", icon: Camera, img: image("photo-1516035069371-29a1b244cc32") },
  { title: "Cinematography", desc: "Big-screen feeling for every story.", icon: Clapperboard, img: image("photo-1478720568477-152d9b164e26") },
  { title: "Pre-wedding Shoots", desc: "Celebrate the story before the day.", icon: Heart, img: image("photo-1537633552985-df8429e8048b") },
  { title: "Commercial Photography", desc: "Make your brand impossible to miss.", icon: Sparkles, img: image("photo-1542038784456-1ea8e935640e") },
  { title: "Drone Videography", desc: "A fresh perspective from above.", icon: Zap, img: image("photo-1474302770737-173ee21bab63") }
];

const showcaseRows = [
  { direction: "left", speed: "38s", items: [creators[0], creators[1], creators[2], creators[3], creators[4], creators[5]] },
  { direction: "right", speed: "44s", items: [creators[5], creators[6], creators[7], creators[1], creators[3], creators[2]] },
  { direction: "left", speed: "49s", items: [creators[4], creators[7], creators[0], creators[6], creators[5], creators[1]] }
];

const faqs = [
  ["What is Creators Zone?", "Creators Zone is a discovery and booking marketplace concept that brings photographers, videographers, editors and creative studios together in one place."],
  ["How can I find creators near me?", "Use the search area to choose a location and category, then browse the sample creator profiles. Location coverage in this demo is illustrative."],
  ["How do I book a creator?", "Open a creator profile, choose Book Now, select a sample date and time slot, and continue to the demo confirmation step. No real booking is created."],
  ["Can photographers register on this platform?", "Yes. The platform is designed for photographers, videographers, editors, studios and other creative professionals to showcase their work."],
  ["How can I contact a creator?", "Use the contact options shown in a creator profile or reach the Creators Zone team through the WhatsApp enquiry button."],
  ["Is online payment available?", "Online payment is not enabled in this frontend demo. Payment and secure checkout would be part of a future production integration."],
  ["How can I join as a creator?", "Select Join as Creator or Contact Our Team to start an enquiry through WhatsApp."]
];

const testimonials = [
  { name: "Ananya Reddy", role: "Customer · Demo testimonial", text: "Finding the right creative team feels so much easier when portfolios and specialties are all in one place.", avatar: image("photo-1534528741775-53994a69daeb", 180) },
  { name: "Karthik Varma", role: "Creator · Demo testimonial", text: "A focused platform where creative professionals can show their work and get discovered is a great idea.", avatar: image("photo-1500648767791-00dcc994a43e", 180) },
  { name: "Priya Sharma", role: "Customer · Demo testimonial", text: "I love being able to compare styles before reaching out. It makes the first step feel simple.", avatar: image("photo-1544005313-94ddf0286df2", 180) },
  { name: "Rahul Mehta", role: "Creator · Demo testimonial", text: "The experience feels clean and visual. It puts the work itself at the centre of discovery.", avatar: image("photo-1506794778202-cad84cf45f1d", 180) }
];

const waBase = "https://wa.me/918247329044";
const waGeneral = `${waBase}?text=${encodeURIComponent("Hello! I would like to know more about your creator discovery and booking platform.")}`;
const waCreator = `${waBase}?text=${encodeURIComponent("Hello! I am interested in joining your platform as a creator. Please share more details.")}`;
const money = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function CreatorCard({ creator, onProfile, onBook }: { creator: Creator; onProfile: (c: Creator) => void; onBook: (c: Creator) => void }) {
  return (
    <article className="creator-card">
      <button className="creator-image-button" onClick={() => onProfile(creator)} aria-label={`View ${creator.name} profile`}>
        <img src={creator.image} alt={`${creator.role} portfolio`} loading="lazy" />
        <span className="image-shade" />
        <span className="verified"><ShieldCheck size={13} /> Demo profile</span>
        <span className="image-open"><ArrowUpRight size={18} /></span>
      </button>
      <div className="creator-info">
        <div className="creator-topline"><span className="creator-role">{creator.role}</span><span className="rating"><Star size={13} fill="currentColor" /> {creator.rating.toFixed(1)}</span></div>
        <h3>{creator.name}</h3>
        <p className="creator-location"><MapPin size={13} /> {creator.location}</p>
        <div className="creator-bottom"><div><small>Starting from</small><strong>{money(creator.price)}</strong></div><span className="review-count">{creator.reviews} reviews*</span></div>
        <div className="creator-actions"><button className="button button-outline button-small" onClick={() => onProfile(creator)}>View profile</button><button className="button button-primary button-small" onClick={() => onBook(creator)}>Book now <ArrowUpRight size={14} /></button></div>
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All locations");
  const [category, setCategory] = useState("All categories");
  const [activeFilter, setActiveFilter] = useState("All Creators");
  const [sort, setSort] = useState("Popularity");
  const [profile, setProfile] = useState<Creator | null>(null);
  const [booking, setBooking] = useState<Creator | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingSlot, setBookingSlot] = useState("");
  const [bookingDone, setBookingDone] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [contactSent, setContactSent] = useState(false);
  const [contactError, setContactError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const reduce = useReducedMotion();

  useMemo(() => {
    if (typeof window === "undefined") return;
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const filteredCreators = useMemo(() => {
    let list = creators.filter(c => {
      const matchesText = `${c.name} ${c.role} ${c.category} ${c.location} ${c.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
      const matchesLocation = location === "All locations" || c.location === location;
      const matchesCategory = category === "All categories" || c.category === category;
      const filterCategory = activeFilter === "All Creators" || c.category === activeFilter;
      return matchesText && matchesLocation && matchesCategory && filterCategory;
    });
    if (sort === "Highest Rated") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Recently Added") list = [...list].reverse();
    return list;
  }, [query, location, category, activeFilter, sort]);

  const openBooking = (c: Creator) => { setProfile(null); setBooking(c); setBookingDone(false); setBookingDate(""); setBookingSlot(""); };
  const runSearch = () => { setQuery(searchTerm); document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" }); };
  const navItems = [["Home", "#home"], ["Explore Creators", "#featured"], ["Categories", "#categories"], ["How It Works", "#how-it-works"], ["About", "#about"], ["Contact", "#contact"]];

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-wrap">
          <a href="#home" className="brand" aria-label="Creators Zone home"><span className="brand-mark"><span /><span /><span /></span><span>creators<span className="brand-light">zone</span><i>.</i></span></a>
          <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>
          <div className="nav-actions"><a className="nav-join" href={waCreator} target="_blank" rel="noreferrer">Join as Creator <ArrowUpRight size={14} /></a><a className="button button-primary nav-cta" href="#featured">Get started <ArrowRight size={15} /></a></div>
          <button className="mobile-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        <AnimatePresence>{menuOpen && <motion.nav className="mobile-nav" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>{navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={15} /></a>)}<a className="mobile-join" href={waCreator} target="_blank" rel="noreferrer">Join as Creator <ArrowUpRight size={15} /></a></motion.nav>}</AnimatePresence>
      </header>

      <section className="hero" id="home">
        <div className="hero-backdrop" />
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> THE CREATIVE MARKETPLACE <span className="eyebrow-line" /></div>
            <h1>Every creative mind.<br /><em>One creative</em> destination.</h1>
            <p className="hero-description">Discover talented photographers, videographers, editors and creative studios near you. Find your perfect match and make something unforgettable.</p>
            <div className="hero-buttons"><a href="#featured" className="button button-primary button-large">Explore creators <ArrowUpRight size={17} /></a><a href={waCreator} target="_blank" rel="noreferrer" className="button button-ghost button-large"><span className="play-icon"><Play size={12} fill="currentColor" /></span> Join our community</a></div>
            <div className="hero-proof"><div className="avatar-stack">{creators.slice(0, 4).map(c => <img key={c.id} src={c.avatar} alt="" />)}</div><div><div className="proof-stars"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></div><span>One place for every creative vision</span></div></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-main"><img src={image("photo-1519741497674-611481863552", 1200)} alt="Cinematic wedding photography" /><div className="hero-image-label"><span className="label-dot" /> STORIES THAT STAY</div></div>
            <div className="hero-image-small hero-image-top"><img src={image("photo-1492691527719-9d1e07e534b4", 500)} alt="Videographer capturing a scene" /><span>BEHIND THE LENS</span></div>
            <div className="hero-image-small hero-image-bottom"><img src={image("photo-1574717024653-61fd2cf4d44d", 500)} alt="Video editing workstation" /><span>THE ART OF EDITING</span></div>
            <div className="floating-note"><span className="floating-note-icon"><Sparkles size={17} /></span><div><strong>Your story,</strong><small>the right people to tell it.</small></div></div>
            <div className="hero-stamp"><span>CREATE</span><span>WITHOUT</span><span>LIMITS <ArrowUpRight size={13} /></span></div>
          </div>
        </div>
        <div className="hero-search-wrap container">
          <div className="hero-search">
            <div className="search-field search-keyword"><Search size={19} /><label><small>What are you looking for?</small><input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyDown={e => e.key === "Enter" && runSearch()} placeholder="Photographer, video editor..." /></label></div>
            <div className="search-field"><MapPin size={19} /><label><small>Location</small><select value={location} onChange={e => setLocation(e.target.value)}><option>All locations</option>{["Kurnool", "Hyderabad", "Bengaluru", "Chennai", "Vijayawada", "Visakhapatnam"].map(x => <option key={x}>{x}</option>)}</select></label></div>
            <div className="search-field"><Camera size={19} /><label><small>Creative category</small><select value={category} onChange={e => setCategory(e.target.value)}><option>All categories</option>{["Photographers", "Videographers", "Video Editors", "Studios"].map(x => <option key={x}>{x}</option>)}</select></label></div>
            <button className="button button-primary search-button" onClick={runSearch}>Find creators <ArrowRight size={16} /></button>
          </div>
          <p className="search-note"><span /> Browse a curated demo directory. Sample profiles and availability are illustrative.</p>
        </div>
        <a href="#showcase" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
      </section>

      <section className="showcase-section section-pad" id="showcase">
        <div className="container showcase-heading"><Reveal><div className="eyebrow">A WORLD OF CREATIVE TALENT</div><h2>Meet the minds behind<br /><em>every great story.</em></h2></Reveal><Reveal delay={0.12}><p>Different perspectives. Distinct styles. Endless possibilities. Get inspired by the people who turn ideas into experiences.</p><a className="text-link" href="#featured">Explore the community <ArrowUpRight size={16} /></a></Reveal></div>
        <div className="marquee-stack">{showcaseRows.map((row, ri) => <div className={`marquee-row ${row.direction === "right" ? "reverse" : ""}`} key={ri} style={{ "--duration": row.speed } as React.CSSProperties}><div className="marquee-track">{[0, 1].map(copy => <div className="marquee-group" key={copy} aria-hidden={copy === 1}>{row.items.map((c, i) => <button className="marquee-card" key={`${copy}-${c.id}-${i}`} onClick={() => setProfile(c)}><img src={c.image} alt="" loading="lazy" /><span className="marquee-overlay" /><span className="marquee-category">{c.role}</span><span className="marquee-name">{c.name}<ArrowUpRight size={15} /></span><span className="marquee-place"><MapPin size={11} /> {c.location}</span></button>)}</div>)}</div></div>)}</div>
        <div className="container showcase-foot"><span>01 — 03</span><p>Hover to pause · Tap a card to preview a creator</p><span className="showcase-foot-line" /></div>
      </section>

      <section className="featured-section section-pad" id="featured">
        <div className="container">
          <Reveal className="section-heading-row"><div><div className="eyebrow">HANDPICKED FOR YOUR NEXT IDEA</div><h2>Creators worth<br /><em>knowing.</em></h2></div><div className="section-heading-aside"><p>Find the creative partner who sees your vision. Browse sample profiles, compare styles and start a conversation.</p><span className="demo-pill"><span /> DEMO DIRECTORY</span></div></Reveal>
          <div className="filter-bar">
            <div className="filter-tabs">{["All Creators", "Photographers", "Videographers", "Video Editors", "Studios"].map(x => <button key={x} className={activeFilter === x ? "active" : ""} onClick={() => setActiveFilter(x)}>{x}</button>)}</div>
            <label className="sort-control"><SlidersHorizontal size={15} /><span>Sort:</span><select value={sort} onChange={e => setSort(e.target.value)}><option>Popularity</option><option>Highest Rated</option><option>Price: Low to High</option><option>Recently Added</option></select><ChevronDown size={13} /></label>
          </div>
          <div className="results-meta"><span>{filteredCreators.length} creators to explore</span><span>*Sample ratings and review counts for demonstration</span></div>
          {filteredCreators.length ? <div className="creator-grid">{filteredCreators.map((c, i) => <Reveal key={c.id} delay={i % 4 * 0.06}><CreatorCard creator={c} onProfile={setProfile} onBook={openBooking} /></Reveal>)}</div> : <div className="empty-state"><Search size={28} /><h3>No creators found</h3><p>Try changing your search or filters.</p><button className="button button-outline" onClick={() => { setQuery(""); setSearchTerm(""); setLocation("All locations"); setCategory("All categories"); setActiveFilter("All Creators"); }}>Clear filters</button></div>}
          <div className="center-cta"><a href={waGeneral} target="_blank" rel="noreferrer" className="button button-outline button-large">Can&apos;t find your creator? <MessageCircle size={16} /></a></div>
        </div>
      </section>

      <section className="categories-section section-pad" id="categories">
        <div className="container"><Reveal className="section-heading-row"><div><div className="eyebrow">FIND YOUR CREATIVE LANE</div><h2>One platform.<br /><em>Every kind of talent.</em></h2></div><p className="heading-description">From the first frame to the final cut, discover specialists for every part of your creative journey.</p></Reveal>
          <div className="category-grid">{categories.map((c, i) => <Reveal key={c.title} delay={(i % 4) * 0.05}><button className="category-card" onClick={() => { const cat = c.title.includes("Video Editing") ? "Video Editors" : c.title.includes("Videography") || c.title.includes("Cinematography") ? "Videographers" : c.title.includes("Studios") ? "Studios" : "Photographers"; setActiveFilter(cat); setCategory("All categories"); document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" }); }}><img src={c.img} alt="" loading="lazy" /><span className="category-overlay" /><span className="category-icon"><c.icon size={18} /></span><span className="category-content"><strong>{c.title}</strong><small>{c.desc}</small><span className="category-explore">Explore category <ArrowUpRight size={14} /></span></span></button></Reveal>)}</div>
        </div>
      </section>

      <section className="how-section section-pad" id="how-it-works"><div className="container"><Reveal className="center-heading"><div className="eyebrow">A BETTER WAY TO CREATE</div><h2>From inspiration<br />to <em>it's a wrap.</em></h2><p>Four simple steps to find your people and bring your vision to life.</p></Reveal><div className="steps-grid">{[{n:"01",title:"Discover",desc:"Find talented creative professionals near your location.",icon:Search},{n:"02",title:"Explore",desc:"Browse portfolios, services, pricing and sample reviews.",icon:Play},{n:"03",title:"Select your slot",desc:"Choose a date and time that works for your plans.",icon:CalendarDays},{n:"04",title:"Connect & book",desc:"Reach out to your chosen creator and confirm the details.",icon:MessageCircle}].map((s,i)=><Reveal key={s.n} delay={i*.08}><div className="step-card"><div className="step-top"><span>{s.n}</span><s.icon size={21} /></div><h3>{s.title}</h3><p>{s.desc}</p><div className="step-line" /></div></Reveal>)}</div></div></section>

      <section className="why-section section-pad"><div className="container why-layout"><Reveal className="why-visual"><img src={image("photo-1492619375914-88005aa9e8fb", 1100)} alt="Creative production team at work" loading="lazy" /><div className="why-image-caption"><span>CREATIVITY, CONNECTED.</span><strong>Good work finds<br />its people.</strong></div><div className="why-number">CZ<span> / 01</span></div></Reveal><div className="why-copy"><Reveal><div className="eyebrow">WHY CREATORS ZONE</div><h2>More than a<br />directory. <em>A starting point.</em></h2><p className="why-intro">The right creative partnership changes everything. We make it easier to discover talent, understand their style and take the next step with confidence.</p></Reveal><div className="benefit-list">{[{icon:MapPin,title:"Discover local talent",desc:"Explore creative professionals across popular cities."},{icon:Camera,title:"Portfolio-first discovery",desc:"See the work and style before you make a decision."},{icon:CalendarDays,title:"Convenient slot selection",desc:"Choose from illustrative availability in the demo."},{icon:MessageCircle,title:"Direct communication",desc:"Start a conversation with a clear next step."}].map((b,i)=><Reveal key={b.title} delay={i*.06}><div className="benefit-item"><span className="benefit-icon"><b.icon size={18} /></span><div><strong>{b.title}</strong><p>{b.desc}</p></div><ArrowUpRight size={16} /></div></Reveal>)}</div></div></div></section>

      <section className="locations-section section-pad" id="locations"><div className="container"><Reveal className="section-heading-row"><div><div className="eyebrow">CREATIVITY HAS NO PIN CODE</div><h2>Find talent in<br /><em>your city.</em></h2></div><p className="heading-description">Explore our sample marketplace coverage across growing creative communities. Actual creator availability is not verified.</p></Reveal><div className="location-grid">{[{name:"Kurnool",count:"Local talent",img:image("photo-1519608487953-e999c86e7455")},{name:"Hyderabad",count:"Creative hub",img:image("photo-1570168007204-dfb528c6958f")},{name:"Bengaluru",count:"Creative hub",img:image("photo-1596176530529-78163a4f7af2")},{name:"Chennai",count:"Creative community",img:image("photo-1509030450996-dd1a26dda07a")},{name:"Vijayawada",count:"Local talent",img:image("photo-1567157577867-05ccb1388e66")},{name:"Visakhapatnam",count:"Coastal creators",img:image("photo-1519046904884-53103b34b206")}].map((l,i)=><button className="location-card" key={l.name} onClick={()=>{setLocation(l.name);setActiveFilter("All Creators");document.getElementById("featured")?.scrollIntoView({behavior:"smooth"});}}><img src={l.img} alt="" loading="lazy" /><span className="location-shade" /><span className="location-index">0{i+1}</span><span className="location-content"><strong>{l.name}</strong><small>{l.count}</small></span><ArrowUpRight size={19} /></button>)}</div></div></section>

      <section className="creator-cta-section"><div className="creator-cta-image"><img src={image("photo-1521737711867-e3b97375f902", 1400)} alt="Creative team collaborating" loading="lazy" /></div><div className="creator-cta-overlay" /><div className="container creator-cta-content"><Reveal><div className="eyebrow"><span className="eyebrow-dot" /> FOR THE PEOPLE WHO CREATE</div><h2>Your talent deserves<br />a <em>bigger audience.</em></h2><p>Join our growing creative community, showcase your portfolio, connect with potential clients and grow your creative business.</p><div className="hero-buttons"><a href={waCreator} target="_blank" rel="noreferrer" className="button button-primary button-large">Become a creator <ArrowUpRight size={17} /></a><a href="#contact" className="button button-ghost button-large">Talk to our team <ArrowRight size={16} /></a></div></Reveal></div></section>

      <section className="about-section section-pad" id="about"><div className="container about-layout"><Reveal><div className="eyebrow">THE IDEA BEHIND THE PLATFORM</div><h2>Connecting creativity<br />with <em>opportunity.</em></h2></Reveal><Reveal delay={0.12}><p className="about-lead">We believe every great idea deserves the right creative partner. Creators Zone is designed to bring talented professionals and the people who need their craft closer together.</p><div className="mission-vision"><div><span>OUR MISSION</span><p>Make discovering and booking creative professionals simple, accessible and convenient.</p></div><div><span>OUR VISION</span><p>Build a connected creative ecosystem where talent can shine and customers can find their perfect creative partner.</p></div></div></Reveal></div><div className="about-marquee"><span>DISCOVER <i>✳</i> CONNECT <i>✳</i> CREATE <i>✳</i> DISCOVER <i>✳</i> CONNECT <i>✳</i> CREATE <i>✳</i></span></div></section>

      <section className="testimonials-section section-pad"><div className="container testimonial-layout"><Reveal><div className="eyebrow">KIND WORDS, CREATIVE ENERGY</div><h2>Good things happen<br />when we <em>connect.</em></h2><p className="testimonial-note">Illustrative testimonials for this product demo — not verified customer reviews.</p><div className="testimonial-controls"><button onClick={()=>setTestimonialIndex(i=>(i+testimonials.length-1)%testimonials.length)} aria-label="Previous testimonial"><ChevronLeft /></button><button onClick={()=>setTestimonialIndex(i=>(i+1)%testimonials.length)} aria-label="Next testimonial"><ChevronRight /></button><span>0{testimonialIndex+1} <i>/</i> 0{testimonials.length}</span></div></Reveal><div className="testimonial-card-wrap"><AnimatePresence mode="wait"><motion.div className="testimonial-card" key={testimonialIndex} initial={reduce?false:{opacity:0,x:25}} animate={{opacity:1,x:0}} exit={reduce?undefined:{opacity:0,x:-25}} transition={{duration:.35}}><div className="quote-mark">“</div><div className="testimonial-stars">{[1,2,3,4,5].map(n=><Star key={n} size={15} fill="currentColor" />)}</div><p>{testimonials[testimonialIndex].text}</p><div className="testimonial-person"><img src={testimonials[testimonialIndex].avatar} alt="" /><div><strong>{testimonials[testimonialIndex].name}</strong><small>{testimonials[testimonialIndex].role}</small></div></div></motion.div></AnimatePresence></div></div></section>

      <section className="faq-section section-pad" id="faq"><div className="container faq-layout"><Reveal><div className="eyebrow">GOOD TO KNOW</div><h2>Questions?<br /><em>We've got you.</em></h2><p>Everything you need to know before you get started.</p><a className="text-link" href={waGeneral} target="_blank" rel="noreferrer">Ask us anything <ArrowUpRight size={16} /></a></Reveal><div className="faq-list">{faqs.map(([q,a],i)=><div className={`faq-item ${faqOpen===i?"open":""}`} key={q}><button onClick={()=>setFaqOpen(faqOpen===i?null:i)} aria-expanded={faqOpen===i}><span><i>0{i+1}</i>{q}</span><span className="faq-plus">{faqOpen===i?<X size={16}/>:<span>+</span>}</span></button><AnimatePresence initial={false}>{faqOpen===i&&<motion.div className="faq-answer" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.25}}><p>{a}</p></motion.div>}</AnimatePresence></div>)}</div></div></section>

      <section className="contact-section section-pad" id="contact"><div className="container contact-layout"><Reveal className="contact-copy"><div className="eyebrow">LET'S MAKE SOMETHING HAPPEN</div><h2>Have a vision?<br /><em>Let's talk.</em></h2><p>Tell us what you are creating, or reach out to learn more about joining the Creators Zone community.</p><a className="contact-direct" href={waGeneral} target="_blank" rel="noreferrer"><span><MessageCircle size={20}/></span><div><small>CHAT WITH US ON WHATSAPP</small><strong>+91 82473 29044</strong></div><ArrowUpRight size={18}/></a><div className="contact-detail"><Mail size={16}/> hello@creatorszone.in <span>·</span> <MapPin size={16}/> India</div></Reveal><Reveal delay={0.12}><form className="contact-form" onSubmit={e=>{e.preventDefault();const f=e.currentTarget;if(!f.reportValidity())return;setContactError("");setContactSent(true);f.reset();}}><div className="form-heading"><span>01 / SAY HELLO</span><h3>Start a conversation</h3><p>We usually respond with a human, not a bot.</p></div><div className="form-row"><label>Full name<input name="name" required placeholder="Your name" /></label><label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label></div><div className="form-row"><label>Phone number<input name="phone" type="tel" pattern="[0-9+() -]{7,18}" required placeholder="+91 00000 00000" /></label><label>Subject<select name="subject" required defaultValue=""><option value="" disabled>Select a subject</option><option>I'm looking to book</option><option>I want to join as a creator</option><option>Partnership enquiry</option><option>Something else</option></select></label></div><label>Your message<textarea name="message" required rows={4} placeholder="Tell us a little about your idea..." /></label><button type="submit" className="button button-primary button-large form-submit">Send enquiry <ArrowUpRight size={16}/></button>{contactSent&&<p className="form-success"><Check size={16}/> Thanks! Your details passed the demo validation. No data was sent to a server.</p>}{contactError&&<p className="form-error">{contactError}</p>}<small className="form-disclaimer">Frontend demo only · Your message is not transmitted or stored.</small></form></Reveal></div></section>

      <footer className="site-footer"><div className="container"><div className="footer-top"><div className="footer-brand-col"><a href="#home" className="brand"><span className="brand-mark"><span/><span/><span/></span><span>creators<span className="brand-light">zone</span><i>.</i></span></a><p>Your vision. Our creators.<br/>One platform.</p><div className="social-links"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook/></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube/></a></div></div><div className="footer-column"><strong>Explore</strong><a href="#featured">Find creators</a><a href="#categories">Categories</a><a href="#locations">Popular locations</a><a href="#how-it-works">How it works</a></div><div className="footer-column"><strong>For creators</strong><a href={waCreator} target="_blank" rel="noreferrer">Join the platform</a><a href={waCreator} target="_blank" rel="noreferrer">Creator enquiries</a><a href="#about">Our story</a><a href="#faq">FAQs</a></div><div className="footer-column footer-contact"><strong>Say hello</strong><a href={waGeneral} target="_blank" rel="noreferrer">+91 82473 29044</a><a href="mailto:hello@creatorszone.in">hello@creatorszone.in</a><span>India · Demo marketplace</span><a className="footer-whatsapp" href={waGeneral} target="_blank" rel="noreferrer"><MessageCircle size={14}/> Chat on WhatsApp</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Creators Zone. All rights reserved.</span><span className="footer-demo">A CREATIVE MARKETPLACE DEMO</span><div><a href="#contact">Privacy</a><a href="#contact">Terms</a><a href="#home">Back to top ↑</a></div></div></div></footer>

      <a className="whatsapp-float" href={waGeneral} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.02 3C8.85 3 3.02 8.78 3.02 15.9c0 2.27.6 4.48 1.74 6.42L3 29l6.88-1.8a13.1 13.1 0 0 0 6.14 1.52h.01c7.17 0 13-5.79 13-12.9 0-3.45-1.35-6.69-3.8-9.12A12.94 12.94 0 0 0 16.02 3Zm0 23.52h-.01a10.9 10.9 0 0 1-5.55-1.51l-.4-.24-4.08 1.07 1.09-3.96-.26-.41a10.7 10.7 0 0 1-1.66-5.57c0-5.94 4.88-10.78 10.88-10.78 2.9 0 5.63 1.12 7.68 3.16a10.66 10.66 0 0 1 3.19 7.62c0 5.94-4.88 10.78-10.88 10.78Zm5.97-8.08c-.33-.16-1.94-.95-2.24-1.06-.3-.11-.52-.16-.74.16-.22.33-.85 1.06-1.04 1.28-.19.22-.38.25-.71.08-.33-.16-1.39-.51-2.65-1.63-.98-.87-1.64-1.94-1.83-2.27-.19-.33-.02-.5.14-.66.15-.14.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.06-.41-.03-.57-.08-.16-.74-1.77-1.01-2.42-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71s1.17 3.14 1.33 3.36c.16.22 2.3 3.5 5.57 4.91.78.33 1.39.53 1.86.68.78.25 1.49.22 2.05.13.63-.09 1.94-.79 2.21-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.63-.38Z"/></svg><span>Chat with us</span></a>
      <button className="back-top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top"><ArrowUpRight size={18}/></button>

      <AnimatePresence>{profile&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)setProfile(null);}}><motion.div className="profile-modal" initial={{opacity:0,y:24,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:16}} role="dialog" aria-modal="true" aria-label={`${profile.name} profile`}><button className="modal-close" onClick={()=>setProfile(null)} aria-label="Close"><X/></button><div className="profile-modal-image"><img src={profile.image} alt={`${profile.name} portfolio`} /></div><div className="profile-modal-content"><span className="creator-role">{profile.role} · DEMO PROFILE</span><h2>{profile.name}</h2><div className="profile-meta"><span><MapPin size={14}/>{profile.location}</span><span><Star size={14} fill="currentColor"/>{profile.rating.toFixed(1)} ({profile.reviews} sample reviews)</span></div><p>{profile.bio}</p><div className="profile-tags">{profile.tags.map(t=><span key={t}>{t}</span>)}</div><div className="profile-price"><div><small>Starting from</small><strong>{money(profile.price)}</strong></div><span>Indicative demo pricing</span></div><button className="button button-primary button-large modal-book" onClick={()=>openBooking(profile)}>Check sample availability <ArrowRight size={16}/></button><p className="modal-disclaimer">Sample profile. Availability, pricing and reviews are not verified.</p></div></motion.div></motion.div>}</AnimatePresence>

      <AnimatePresence>{booking&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)setBooking(null);}}><motion.div className="booking-modal" initial={{opacity:0,y:24,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:16}} role="dialog" aria-modal="true" aria-label="Demo booking"><button className="modal-close" onClick={()=>setBooking(null)} aria-label="Close"><X/></button>{bookingDone?<div className="booking-success"><span><Check size={28}/></span><div className="eyebrow">DEMO REQUEST COMPLETE</div><h2>That&apos;s a wrap!</h2><p>Your sample booking selection for <strong>{booking.name}</strong> is ready. No real reservation has been created.</p><button className="button button-primary button-large" onClick={()=>setBooking(null)}>Done <ArrowRight size={16}/></button></div>:<><div className="eyebrow">A GOOD STORY STARTS HERE</div><h2>Book a creative<br/><em>conversation.</em></h2><p className="booking-for">Selected creator: <strong>{booking.name}</strong> · {money(booking.price)} onwards</p><label className="booking-label">Choose a date<input type="date" min={new Date().toISOString().split("T")[0]} value={bookingDate} onChange={e=>setBookingDate(e.target.value)}/></label><div className="booking-label"><span>Choose a sample time slot</span><div className="slot-grid">{booking.slots.map(s=><button key={s} className={bookingSlot===s?"selected":""} onClick={()=>setBookingSlot(s)}><Clock3 size={13}/>{s}</button>)}</div></div><button className="button button-primary button-large booking-submit" disabled={!bookingDate||!bookingSlot} onClick={()=>setBookingDone(true)}>Confirm demo selection <ArrowRight size={16}/></button><p className="modal-disclaimer">This is a frontend demo. It will not reserve a real creator or send a notification.</p></>}</motion.div></motion.div>}</AnimatePresence>
    </main>
  );
}
