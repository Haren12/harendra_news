import { Article, Author, SystemLog } from '../types';
import harendraAvatar from '../assets/harendra_avatar.jpg';

export const mockAuthors: Author[] = [
  {
    id: 'auth-1',
    name: 'Harendra Lamsal',
    role: 'CEO & Founder, Chief Editor',
    avatar: harendraAvatar,
    bio: 'Founder, CEO and Lead Architect. Passionate about cutting-edge technology, AI intelligence, and sovereign digital infrastructures.',
    articlesCount: 156
  },
  {
    id: 'auth-2',
    name: 'Elena Rostova',
    role: 'Global Geopolitics & Cyber Warfare Editor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    bio: 'Investigative journalist focusing on state-sponsored cyber operations and digital sovereignty.',
    articlesCount: 98
  },
  {
    id: 'auth-3',
    name: 'Marcus Chen',
    role: 'FinTech & Decentralized Markets Analyst',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    bio: 'Tracking autonomous algorithmic trading and sovereign digital currency integrations.',
    articlesCount: 115
  },
  {
    id: 'auth-4',
    name: 'Sarah Jenkins',
    role: 'Biotech & Neural Interfaces Lead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    bio: 'Covering human-machine symbiosis, neural prosthetics, and longevity tech.',
    articlesCount: 76
  }
];

export const mockArticles: Article[] = [
  {
    id: 'art-1',
    title: 'Autonomous Quantum Superclusters Achieve Zero-Latency Global Encryption Grid',
    subtitle: 'Next-generation post-quantum cryptography deployed across 45 financial hubs, rendering brute-force quantum decryption mathematically obsolete.',
    content: `In a landmark engineering breakthrough, a consortium of decentralized quantum research facilities has successfully synchronized a global quantum encryption grid operating on entangled photon channels. 

### The Architecture of Unhackable Networks
Traditional RSA and elliptic-curve cryptography have long faced an impending expiration date with the advent of noisy intermediate-scale quantum (NISQ) computers. However, the newly deployed **Nexus-Q Protocol** utilizes continuous-variable quantum key distribution (CV-QKD) across intercontinental fiber and satellite relays.

> "We have moved beyond the paradigm of merely defending data; we are now operating in an era where interception mathematically alters the state of the transmission itself, triggering instant network self-healing." 
> — *Harendra Lamsal, CEO & Founder*

### Economic and Geopolitical Impact
Global central banks and sovereign cloud providers have already begun migrating legacy ledgers to the new quantum mesh. Analysts project that cyber espionage losses will drop by 82% over the next fiscal cycle as unauthorized decryption attempts trigger immediate topological isolation of compromised nodes.`,
    category: 'Technology',
    tags: ['Quantum Computing', 'Cybersecurity', 'Encryption', 'AI Infrastructure'],
    author: mockAuthors[0],
    publishedAt: '12 mins ago',
    readTime: '4 min read',
    views: 45290,
    likes: 3421,
    bookmarks: 1205,
    featured: true,
    breaking: true,
    trending: true,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'Global quantum encryption grid deployed across 45 financial hubs, utilizing CV-QKD to eliminate brute-force decryption risks and reduce cyber espionage by 82%.',
    sentiment: 'Tech-Optimistic',
    seo: {
      metaTitle: 'Quantum Superclusters Deploy Zero-Latency Encryption Grid',
      metaDescription: 'Discover how the new Nexus-Q Protocol utilizes entangled photon channels to achieve mathematically unbreakable global cybersecurity.',
      keywords: ['Quantum Computing', 'Cybersecurity', 'Nexus-Q', 'Encryption']
    },
    comments: [
      {
        id: 'c-1',
        articleId: 'art-1',
        authorName: 'VectorX',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
        content: 'Fascinating leap forward. Wondering how satellite latency handles atmospheric scintillation during solar flares.',
        createdAt: '8 mins ago',
        likes: 42
      },
      {
        id: 'c-2',
        articleId: 'art-1',
        authorName: 'CipherQueen',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
        content: 'This changes the entire threat model for autonomous drone fleets and orbital defense systems.',
        createdAt: '3 mins ago',
        likes: 19
      }
    ]
  },
  {
    id: 'art-2',
    title: 'Synthetic Neural Mesh Replaces Traditional Cloud Servers in Enterprise Data Hubs',
    subtitle: 'Distributed cognitive clusters process enterprise workloads with 99.999% autonomous self-optimization and near-zero power footprints.',
    content: `Enterprise IT infrastructure is undergoing its most radical transformation since the invention of virtualization. Synthetic Neural Meshes—decentralized networks of self-reconfiguring neuromorphic processors—are displacing conventional hypervisors and hyperscale cloud datacenters.

### Neuromorphic Efficiency
Unlike von Neumann architectures that suffer from the memory wall bottleneck, neuromorphic chips mimic biological synaptic pathways. Data is processed locally and distributed across the cognitive mesh, resulting in energy consumption reductions of up to 74%.

### Autonomous Fault Recovery
When hardware anomalies occur, the neural mesh reroutes execution pathways within nanoseconds without human intervention or downtime, setting a new benchmark for high-availability enterprise services.`,
    category: 'Technology',
    tags: ['AI Infrastructure', 'Neuromorphic', 'Cloud Computing', 'Enterprise IT'],
    author: mockAuthors[3],
    publishedAt: '42 mins ago',
    readTime: '5 min read',
    views: 28400,
    likes: 1890,
    bookmarks: 840,
    featured: true,
    breaking: false,
    trending: true,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'Neuromorphic synthetic neural meshes replace traditional cloud datacenters, reducing power consumption by 74% and providing nanosecond fault recovery.',
    sentiment: 'Tech-Optimistic',
    seo: {
      metaTitle: 'Synthetic Neural Mesh Replaces Enterprise Cloud Servers',
      metaDescription: 'Explore how neuromorphic computing clusters are transforming enterprise IT with autonomous self-optimization and extreme energy efficiency.',
      keywords: ['Neuromorphic', 'Cloud Computing', 'AI', 'Enterprise']
    }
  },
  {
    id: 'art-3',
    title: 'Autonomous Algorithmic Syndicates Outpace Traditional Venture Capital in Deep Tech',
    subtitle: 'Self-governing DAO investment protocols deploy over $14B into early-stage robotics and fusion energy startups with zero human intermediaries.',
    content: `The venture capital landscape has been seismically disrupted by autonomous financial syndicates. Operating on decentralized smart contracts powered by predictive machine learning agents, these syndicates evaluate patent libraries, prototype telemetry, and market viability in seconds.

### The Speed of Autonomous Capital
Where human partners spend months in due diligence, algorithmic syndicates execute multi-million dollar seed rounds instantaneously based on cryptographic proof-of-work and automated code audits.

### Accountability and Governance
Critics raise questions about fiduciary liability when AI agents control systemic liquidity, yet founders praise the elimination of bureaucratic gatekeepers and biased human networks.`,
    category: 'Business',
    tags: ['FinTech', 'DAO', 'Venture Capital', 'Deep Tech', 'Algorithmic Trading'],
    author: mockAuthors[2],
    publishedAt: '2 hours ago',
    readTime: '6 min read',
    views: 19200,
    likes: 1420,
    bookmarks: 610,
    featured: false,
    breaking: false,
    trending: true,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'Autonomous algorithmic DAOs have deployed over $14B into deep tech startups, replacing human venture capitalists with predictive AI evaluation models.',
    sentiment: 'Neutral',
    seo: {
      metaTitle: 'Algorithmic Syndicates Disrupt Venture Capital',
      metaDescription: 'Autonomous financial syndicates using predictive machine learning are funding deep tech startups in seconds with zero human intermediaries.',
      keywords: ['DAO', 'Venture Capital', 'AI Finance', 'Deep Tech']
    }
  },
  {
    id: 'art-4',
    title: 'Global Geopolitical Summit Agrees on Strict Autonomous Drone Weaponry Moratorium',
    subtitle: 'Delegates from 88 nations ratify the Geneva Cyber Accords, establishing mandatory human-in-the-loop kill switches for all orbital and terrestrial tactical drones.',
    content: `In an unprecedented diplomatic accord forged in Geneva, representatives from 88 sovereign states have unanimously ratified a binding treaty governing autonomous tactical systems.

### Key Provisions of the Accord
1. **Absolute Human Authorization**: Lethal engagement protocols can never be fully delegated to local neural weights without verifiable human telemetry confirmation.
2. **Black Box Telemetry Auditing**: All military robotics must stream encrypted decision trees to international oversight servers.
3. **Severe Sanctions**: Autonomous deployment without compliance triggers automated trade and grid isolation protocols.

Military strategists call the treaty a watershed moment in preventing runaway algorithmic escalation during geopolitical friction.`,
    category: 'Politics',
    tags: ['Geopolitics', 'Defense', 'Autonomous Drones', 'Geneva Accords'],
    author: mockAuthors[1],
    publishedAt: '3 hours ago',
    readTime: '5 min read',
    views: 31500,
    likes: 2750,
    bookmarks: 980,
    featured: false,
    breaking: true,
    trending: false,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=1200',
    aiSummary: '88 nations sign the Geneva Cyber Accords, mandating human-in-the-loop kill switches and encrypted telemetry auditing for all autonomous defense systems.',
    sentiment: 'Positive',
    seo: {
      metaTitle: 'Global Summit Signs Autonomous Drone Weaponry Moratorium',
      metaDescription: 'Geneva Cyber Accords mandate human-in-the-loop controls for tactical military robotics across 88 nations.',
      keywords: ['Geopolitics', 'Defense', 'Geneva Accords', 'AI Ethics']
    }
  },
  {
    id: 'art-5',
    title: 'Neural Prosthetic Implants Restore Full Multisensory Perception in Paralysis Patients',
    subtitle: 'Direct cortical interfaces bridge severed spinal pathways, allowing patients to feel tactile warmth, texture, and proprioceptive motion within hours of activation.',
    content: `Medical robotics has achieved a profound milestone. Clinical trials of the **SynapseLink-V4** cortical implant have successfully restored full sensory feedback and motor autonomy to patients with complete spinal cord transections.

### Bidirectional Neural Bridging
Unlike earlier iterations that only translated motor intent outward, the V4 implant features bidirectional micro-electrode arrays that stimulate somatosensory cortex regions in real time. Patients report being able to discern the delicate texture of silk and the temperature of metallic objects instantly.`,
    category: 'Health',
    tags: ['Biotech', 'Neural Interfaces', 'Medical Tech', 'Neuroscience'],
    author: mockAuthors[3],
    publishedAt: '5 hours ago',
    readTime: '4 min read',
    views: 24100,
    likes: 3100,
    bookmarks: 1450,
    featured: false,
    breaking: false,
    trending: true,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'SynapseLink-V4 cortical implants successfully restore full tactile sensation and motor control in paralysis patients through bidirectional neural bridging.',
    sentiment: 'Tech-Optimistic',
    seo: {
      metaTitle: 'Neural Implants Restore Multisensory Perception',
      metaDescription: 'Clinical trials of SynapseLink-V4 bridge spinal injuries with bidirectional micro-electrode arrays.',
      keywords: ['Neural Implants', 'Biotech', 'Neuroscience', 'Medical Tech']
    }
  },
  {
    id: 'art-6',
    title: 'Commercial Fusion Reactor Sustains Net-Positive Plasma Burn for Record 72 Days',
    subtitle: 'Helicap-S Tokamak design proves magnetic confinement stability under high neutron flux, clearing the path for commercial baseload clean energy by 2028.',
    content: `The clean energy transition received its ultimate validation today as the Helicap-S fusion reactor completed 1,728 hours of continuous net-positive plasma generation.

### High-Temperature Superconductors
The secret to the milestone lies in second-generation rare-earth barium copper oxide (REBCO) tape magnets, which generated a stable 25-tesla magnetic bottle without quenching. The resulting thermal output is already being converted into green hydrogen and baseload electricity for regional grids.`,
    category: 'Technology',
    tags: ['Fusion Energy', 'Clean Tech', 'Physics', 'Sustainability'],
    author: mockAuthors[0],
    publishedAt: '6 hours ago',
    readTime: '5 min read',
    views: 39800,
    likes: 4520,
    bookmarks: 1980,
    featured: false,
    breaking: false,
    trending: true,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'Commercial fusion reactor Helicap-S sustains net-positive plasma burn for 72 days using REBCO magnets, paving the way for 2028 clean energy baseload.',
    sentiment: 'Tech-Optimistic',
    seo: {
      metaTitle: 'Commercial Fusion Reactor Sustains Net-Positive Plasma',
      metaDescription: 'Helicap-S Tokamak achieves 72 days of continuous fusion energy generation with advanced REBCO superconducting magnets.',
      keywords: ['Fusion Energy', 'Clean Tech', 'Tokamak', 'Renewables']
    }
  },
  {
    id: 'art-7',
    title: 'Immersive Neural Cinema: The Rise of Direct-to-Cortex Sensory Films',
    subtitle: 'Hollywood studios debut first fully synthesized limbic narratives where audiences experience emotional resonance and olfactory simulation.',
    content: `Entertainment is breaking free from rectangular screens and audio speakers. A new wave of cinematic pioneers has released the world's first certified *Limbic Feature Film*, transmitting multi-sensory emotional narratives directly into consumer neural headsets.

### Ethical and Creative Boundaries
While critics debate the sensory manipulation potential of direct-to-cortex storytelling, box office returns for opening weekend shattered traditional records as millions experienced visceral, shared narrative immersion.`,
    category: 'Entertainment',
    tags: ['VR / AR', 'Cinema', 'Neural Media', 'Entertainment'],
    author: mockAuthors[2],
    publishedAt: '8 hours ago',
    readTime: '4 min read',
    views: 16500,
    likes: 980,
    bookmarks: 420,
    featured: false,
    breaking: false,
    trending: false,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'Hollywood debuts direct-to-cortex limbic cinema, allowing audiences to experience emotional and sensory narratives through neural headsets.',
    sentiment: 'Neutral',
    seo: {
      metaTitle: 'Immersive Neural Cinema: Direct-to-Cortex Films',
      metaDescription: 'Explore the rise of limbic cinema streaming emotional and sensory experiences directly to neural headsets.',
      keywords: ['Neural Cinema', 'Entertainment', 'VR', 'Media']
    }
  },
  {
    id: 'art-8',
    title: 'Autonomous Space Elevators Enter Phase-1 Carbon Nanotube Cable Anchoring',
    subtitle: 'Orbital tether deployment begins from equatorial marine platforms, promising 95% reduction in payload launch costs to low Earth orbit.',
    content: `Space logistics is stepping out of the chemical rocket era. Marine engineering vessels have successfully moored the primary anchor buoy for the equatorial Space Elevator Project, designated *Astra-Anchor-1*.

### Carbon Nanotube Tensile Strength
Using vapor-grown carbon nanotube ribbons with a tensile strength exceeding 120 gigapascals, the tether will stretch 36,000 kilometers into geostationary orbit, allowing magnetic climber pods to ferry cargo silently and cleanly into space.`,
    category: 'International',
    tags: ['Space Tech', 'Aerospace', 'Engineering', 'Global Infrastructure'],
    author: mockAuthors[1],
    publishedAt: '10 hours ago',
    readTime: '6 min read',
    views: 31200,
    likes: 3890,
    bookmarks: 1670,
    featured: false,
    breaking: false,
    trending: false,
    image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'Phase-1 anchoring begins for the equatorial space elevator, utilizing carbon nanotube tethers to cut orbital launch costs by 95%.',
    sentiment: 'Tech-Optimistic',
    seo: {
      metaTitle: 'Space Elevator Project Begins Carbon Nanotube Tether Anchoring',
      metaDescription: 'Equatorial marine platforms anchor Astra-Anchor-1, initiating the era of space elevator cargo logistics.',
      keywords: ['Space Elevator', 'Aerospace', 'Nanotubes', 'Orbit']
    }
  },
  {
    id: 'art-9',
    title: 'Nepal National Digital Infrastructure Mesh Expands to 753 Local Municipalities',
    titleNe: 'नेपाल राष्ट्रिय डिजिटल पूर्वाधार मेस ७५३ वटा स्थानीय पालिकामा विस्तार',
    subtitle: 'Led by CEO Harendra Lamsal, the nationwide fiber and autonomous intelligence rollout connects remote mountain schools and health posts to high-speed quantum cloud.',
    subtitleNe: 'प्रधान सम्पादक नरेन्द्र लम्सालको नेतृत्वमा राष्ट्रिय फाइबर तथा स्वायत्त इन्टेलिजेन्स रोलआउटले दुर्गम हिमालका विद्यालय र स्वास्थ्य चौकीलाई जोडेको छ।',
    content: `Nepal’s digital transformation has reached a monumental milestone as the National Digital Intelligence Mesh successfully completes fiber and satellite terminal integration across all 753 local government headquarters.

### Empowering Rural Communities
Under the strategic leadership of CEO Harendra Lamsal, the initiative ensures real-time public service delivery, digitized land registries, and telemedicine access for high-altitude Himalayan settlements.

> "True digital sovereignty means every citizen from Kathmandu to Humla has instantaneous, secure access to state intelligence, education, and healthcare." 
> — *Harendra Lamsal, CEO & Founder*`,
    category: 'Nepal News',
    tags: ['Nepal', 'Digital Infrastructure', 'Local Government', 'Connectivity'],
    author: mockAuthors[0],
    publishedAt: '1 hour ago',
    readTime: '5 min read',
    views: 28400,
    likes: 2150,
    bookmarks: 890,
    featured: true,
    breaking: true,
    trending: true,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'Nepal expands digital intelligence mesh to all 753 municipalities, providing high-speed connectivity and telemedicine under Harendra Lamsal leadership.',
    sentiment: 'Tech-Optimistic',
    seo: {
      metaTitle: 'Nepal Digital Mesh Connects 753 Municipalities',
      metaDescription: 'National digital infrastructure rollout by CEO Harendra Lamsal connects remote Himalayan regions to high-speed cloud.',
      keywords: ['Nepal News', 'Digital Nepal', 'Harendra Lamsal', 'Municipalities']
    }
  },
  {
    id: 'art-10',
    title: 'Global Climate Summit Adopts Himalayan Glacier Preservation Protocol',
    subtitle: 'Delegates from 195 nations ratify emergency funding for high-altitude sensor networks and artificial snow reserves in the Hindu Kush Himalayas.',
    content: `In response to accelerating thermal shifts in high-altitude cryosphere reserves, the UN Climate Assembly unanimously ratified the *Himalayan Shield Treaty*. 

### Automated Sensor Arrays
The pact establishes automated cryogenic monitoring arrays across Annapurna, Everest, and Kanchenjunga ranges to track glacial melt velocity in real time.`,
    category: 'World News',
    tags: ['Global News', 'Climate Change', 'Himalayas', 'UN Treaty'],
    author: mockAuthors[1],
    publishedAt: '3 hours ago',
    readTime: '4 min read',
    views: 39100,
    likes: 4120,
    bookmarks: 1450,
    featured: false,
    breaking: false,
    trending: true,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'Global climate summit adopts Himalayan Shield Treaty to fund automated cryogenic monitoring across high-altitude mountain ranges.',
    sentiment: 'Neutral',
    seo: {
      metaTitle: 'Global Climate Summit Adopts Himalayan Treaty',
      metaDescription: '195 nations ratify emergency funding for cryogenic sensor arrays in the Hindu Kush Himalayas.',
      keywords: ['World News', 'Climate', 'Himalayas', 'Treaty']
    }
  },
  {
    id: 'art-11',
    title: 'Kathmandu Metropolitan City Launches Smart Traffic & Autonomous Transit Grid',
    titleNe: 'काठमाडौं महानगरपालिकाद्वारा स्मार्ट ट्राफिक तथा स्वायत्त पारवहन ग्रिडको शुभारम्भ',
    subtitle: 'AI-controlled adaptive traffic signals reduce inner-city congestion by 45% while electric micro-buses integrate with real-time commuter apps.',
    subtitleNe: 'एआई-नियन्त्रित अनुकूली ट्राफिक संकेतहरूले भित्री सहरको भिडभाड ४५% ले घटाएका छन् भने विद्युतीय माइक्रोबसहरू एपसँग जोडिएका छन्।',
    content: `Commuters navigating Kathmandu’s bustling arteries are experiencing immediate relief following the launch of the Metropolitan Smart Transit Grid. 

### AI Signal Optimization
Powered by localized neural networks, traffic lights dynamically adjust timing based on real-time pedestrian and vehicle density.`,
    category: 'Local News',
    tags: ['Kathmandu', 'Smart City', 'Urban Transit', 'Local News'],
    author: mockAuthors[0],
    publishedAt: '4 hours ago',
    readTime: '3 min read',
    views: 19800,
    likes: 1540,
    bookmarks: 620,
    featured: false,
    breaking: false,
    trending: false,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'Kathmandu Metropolitan City launches AI traffic grid, cutting congestion by 45% with adaptive signal optimization.',
    sentiment: 'Tech-Optimistic',
    seo: {
      metaTitle: 'Kathmandu Launches Smart Traffic Grid',
      metaDescription: 'AI-controlled adaptive traffic signals reduce congestion in Kathmandu valley.',
      keywords: ['Local News', 'Kathmandu', 'Smart City', 'Transit']
    }
  },
  {
    id: 'art-12',
    title: 'Gandaki Province Announces High-Tech Agricultural Drone Subsidy for Farmers',
    titleNe: 'गण्डकी प्रदेशद्वारा किसानहरूका लागि हाइटेक कृषि ड्रोन अनुदानको घोषणा',
    subtitle: 'Over 5,000 agrarian cooperatives receive automated crop-spraying and soil-analysis drones to boost organic cardamom and tea yields.',
    subtitleNe: '५,००० भन्दा बढी कृषि सहकारीहरूले अर्गानिक अलैंची र चिया उत्पादन बढाउन स्वचालित बाली-छर्कने र माटो-विश्लेषण ड्रोन प्राप्त गरेका छन्।',
    content: `Agriculture modernization in provincial Nepal took a giant leap forward today as Gandaki Province unveiled its agrarian autonomy initiative.

### Precision Farming
Farmers equipped with AI-guided drones can now pinpoint irrigation needs and nutrient deficiencies across rugged terraced farmlands with centimeter-level precision.`,
    category: 'Province News',
    tags: ['Gandaki', 'Agriculture', 'Province News', 'Drones'],
    author: mockAuthors[2],
    publishedAt: '5 hours ago',
    readTime: '4 min read',
    views: 14200,
    likes: 980,
    bookmarks: 390,
    featured: false,
    breaking: false,
    trending: false,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'Gandaki Province subsidizes AI agricultural drones for 5,000 farming cooperatives to boost tea and cardamom yields.',
    sentiment: 'Tech-Optimistic',
    seo: {
      metaTitle: 'Gandaki Province Agrarian Drone Subsidy',
      metaDescription: 'Provincial government equips farmers with precision agriculture drones for terraced farming.',
      keywords: ['Province News', 'Gandaki', 'Agriculture', 'Drones']
    }
  },
  {
    id: 'art-13',
    title: 'Nepal Central Bank Introduces Interoperable Sovereign Digital Rupee Gateway',
    titleNe: 'नेपाल राष्ट्र बैंकद्वारा अन्तरसञ्चालनयोग्य सार्वभौम डिजिटल मुद्रा गेटवेको सुरुआत',
    subtitle: 'Instant cross-border remittances and merchant settlements go live with zero intermediary transaction fees.',
    subtitleNe: 'शून्य मध्यस्थ कारोबार शुल्कसहित तत्काल सीमापार रेमिट्यान्स र व्यापारी भुक्तानीहरू लाइभ भएका छन्।',
    content: `The financial sector in South Asia is witnessing a paradigm shift as Nepal Rastra Bank rolls out the sovereign digital currency gateway. 

### Instant Remittance Settler
Expatriate workers sending remittances from overseas can now transfer funds instantly through encrypted blockchain channels with zero currency conversion lag.`,
    category: 'Economy & Banking',
    tags: ['Economy', 'Banking', 'Digital Currency', 'FinTech'],
    author: mockAuthors[2],
    publishedAt: '6 hours ago',
    readTime: '5 min read',
    views: 25600,
    likes: 2100,
    bookmarks: 940,
    featured: false,
    breaking: false,
    trending: true,
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'Nepal Central Bank launches sovereign digital currency gateway for instant, zero-fee remittances and merchant settlements.',
    sentiment: 'Tech-Optimistic',
    seo: {
      metaTitle: 'Nepal Central Bank Launches Digital Currency Gateway',
      metaDescription: 'Instant cross-border remittances and zero-fee settlements go live on sovereign blockchain mesh.',
      keywords: ['Economy & Banking', 'Digital Rupee', 'Remittance', 'FinTech']
    }
  },
  {
    id: 'art-14',
    title: 'Tribhuvan University Deploys Autonomous AI Tutors Across All Constituent Campuses',
    titleNe: 'त्रिभुवन विश्वविद्यालयद्वारा सबै आंगिक क्याम्पसहरूमा स्वायत्त एआई ट्युटरहरूको जडान',
    subtitle: 'Personalized quantum LLM tutors provide multilingual academic coaching in Nepali, Newari, Maithili, and English.',
    subtitleNe: 'व्यक्तिगत क्वान्टम एलएलएम ट्युटरहरूले नेपाली, नेवारी, मैथिली र अंग्रेजीमा बहुभाषी शैक्षिक कोचिङ प्रदान गर्छन्।',
    content: `Higher education in Nepal is embracing autonomous cognitive tooling. Tribhuvan University has officially activated localized LLM tutoring modules across its 60+ constituent campuses.`,
    category: 'Education',
    tags: ['Education', 'AI Tutors', 'University', 'EdTech'],
    author: mockAuthors[3],
    publishedAt: '7 hours ago',
    readTime: '4 min read',
    views: 18900,
    likes: 1450,
    bookmarks: 510,
    featured: false,
    breaking: false,
    trending: false,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'Tribhuvan University deploys localized AI tutors across campuses, offering multilingual academic coaching in regional languages.',
    sentiment: 'Tech-Optimistic',
    seo: {
      metaTitle: 'Tribhuvan University Deploys AI Tutors',
      metaDescription: 'Autonomous quantum LLM tutors provide multilingual coaching across all TU campuses.',
      keywords: ['Education', 'Tribhuvan University', 'EdTech', 'AI']
    }
  },
  {
    id: 'art-15',
    title: 'Himalayan Eco-Tourism Boom: Augmented Reality Trails Guide Trekkers in Everest Region',
    subtitle: 'Solar-powered AR beacons provide real-time weather alerts, historical insights, and high-altitude emergency navigation.',
    content: `Adventure tourism in the Himalayas is safer and more immersive than ever. The Ministry of Tourism has completed the installation of solar-powered AR trail beacons along the Everest Base Camp route.`,
    category: 'Tourism',
    tags: ['Tourism', 'Everest', 'AR Trails', 'Himalayas'],
    author: mockAuthors[1],
    publishedAt: '8 hours ago',
    readTime: '4 min read',
    views: 31200,
    likes: 2890,
    bookmarks: 1120,
    featured: false,
    breaking: false,
    trending: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'Solar-powered AR beacons installed along Everest trekking routes provide real-time weather alerts and emergency navigation.',
    sentiment: 'Tech-Optimistic',
    seo: {
      metaTitle: 'AR Trails Transform Everest Trekking Tourism',
      metaDescription: 'Ministry of Tourism installs solar AR beacons for secure high-altitude trekking.',
      keywords: ['Tourism', 'Everest', 'AR', 'Himalayas']
    }
  },
  {
    id: 'art-16',
    title: 'National Cyber Security Center Neutralizes Sophisticated Zero-Day Phishing Syndicate',
    subtitle: 'Automated threat hunting nodes trace cybercriminal ring across international proxy networks within 43 minutes.',
    content: `Law enforcement and national cyber defense units achieved a major victory today by dismantling an automated phishing and credential-harvesting cartel operating across multiple jurisdictions.`,
    category: 'Crime & Security',
    tags: ['Cybersecurity', 'Crime', 'National Security', 'Defense'],
    author: mockAuthors[0],
    publishedAt: '9 hours ago',
    readTime: '4 min read',
    views: 22400,
    likes: 1870,
    bookmarks: 740,
    featured: false,
    breaking: false,
    trending: false,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'National cybersecurity center neutralizes international phishing syndicate in 43 minutes using automated threat hunting.',
    sentiment: 'Tech-Optimistic',
    seo: {
      metaTitle: 'Cyber Security Center Neutralizes Phishing Syndicate',
      metaDescription: 'National defense nodes trace and neutralize cross-border cybercriminal syndicate.',
      keywords: ['Crime & Security', 'Cyber Defense', 'Phishing', 'National Security']
    }
  },
  {
    id: 'art-17',
    title: 'Organic Tea and Coffee Exports Surge 64% Following Blockchain Provenance Tracking',
    subtitle: 'Global consumers verify single-estate origin in Illam and Dhankuta instantly by scanning biodegradable packaging QR codes.',
    content: `Nepal’s specialty tea and organic coffee sectors are commanding premium global prices thanks to end-to-end blockchain supply chain transparency.`,
    category: 'Agriculture',
    tags: ['Agriculture', 'Organic Tea', 'Blockchain', 'Exports'],
    author: mockAuthors[2],
    publishedAt: '10 hours ago',
    readTime: '3 min read',
    views: 16800,
    likes: 1250,
    bookmarks: 480,
    featured: false,
    breaking: false,
    trending: false,
    image: 'https://images.unsplash.com/photo-1527788313575-d24c04291880?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'Organic tea and coffee exports surge 64% as blockchain provenance tracking guarantees single-estate origin for global buyers.',
    sentiment: 'Tech-Optimistic',
    seo: {
      metaTitle: 'Organic Tea & Coffee Exports Surge via Blockchain',
      metaDescription: 'Illam and Dhankuta estates achieve 64% export growth using transparent supply chain verification.',
      keywords: ['Agriculture', 'Tea', 'Coffee', 'Blockchain']
    }
  },
  {
    id: 'art-18',
    title: 'Quantum Neural Labs Achieve Breakthrough in Room-Temperature Superconductors',
    subtitle: 'New material matrix enables lossless power transmission across national grids with zero thermal dissipation.',
    content: `Physicists at the Quantum Neural Research Complex have synthesized a stable room-temperature superconductor alloy capable of revolutionizing global energy distribution.`,
    category: 'Science & AI',
    tags: ['Science', 'Superconductors', 'Physics', 'Clean Energy'],
    author: mockAuthors[3],
    publishedAt: '11 hours ago',
    readTime: '6 min read',
    views: 41200,
    likes: 4920,
    bookmarks: 2100,
    featured: true,
    breaking: false,
    trending: true,
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1200',
    aiSummary: 'Breakthrough room-temperature superconductor alloy enables lossless power transmission across national grids with zero thermal dissipation.',
    sentiment: 'Tech-Optimistic',
    seo: {
      metaTitle: 'Breakthrough in Room-Temperature Superconductors',
      metaDescription: 'Quantum Neural Labs synthesize stable superconductor material for lossless energy transmission.',
      keywords: ['Science & AI', 'Superconductors', 'Physics', 'Energy']
    }
  }
];

export const mockSystemLogs: SystemLog[] = [
  { id: 'log-1', timestamp: '2026-07-10 09:42:15', level: 'success', message: 'Nexus-Q Quantum Grid synchronized across 45 nodes', source: 'QuantumCore' },
  { id: 'log-2', timestamp: '2026-07-10 09:38:02', level: 'info', message: 'AI Autonomous Writer processed 1,420 article drafts', source: 'GeminiEngine' },
  { id: 'log-3', timestamp: '2026-07-10 09:15:44', level: 'success', message: 'Supabase RLS security policies verified across 24 tables', source: 'PostgreSQL-RLS' },
  { id: 'log-4', timestamp: '2026-07-10 08:50:11', level: 'warn', message: 'High request velocity detected on /api/ai/write (Rate limiter engaged)', source: 'EdgeGateway' },
  { id: 'log-5', timestamp: '2026-07-10 08:22:00', level: 'success', message: 'Automated encrypted backup snapshot stored to AWS S3 / Supabase Storage', source: 'BackupDaemon' }
];
