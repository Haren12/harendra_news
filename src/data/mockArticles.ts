import { Article, Author, SystemLog } from '../types';

export const mockAuthors: Author[] = [
  {
    id: 'auth-1',
    name: 'Dr. Alistair Vance',
    role: 'Chief AI & Quantum Correspondent',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    bio: 'Former CERN researcher specializing in quantum neural architectures and decentralized cyber intelligence.',
    articlesCount: 142
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
> — *Dr. Alistair Vance, Lead Architect*

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
  }
];

export const mockSystemLogs: SystemLog[] = [
  { id: 'log-1', timestamp: '2026-07-10 09:42:15', level: 'success', message: 'Nexus-Q Quantum Grid synchronized across 45 nodes', source: 'QuantumCore' },
  { id: 'log-2', timestamp: '2026-07-10 09:38:02', level: 'info', message: 'AI Autonomous Writer processed 1,420 article drafts', source: 'GeminiEngine' },
  { id: 'log-3', timestamp: '2026-07-10 09:15:44', level: 'success', message: 'Supabase RLS security policies verified across 24 tables', source: 'PostgreSQL-RLS' },
  { id: 'log-4', timestamp: '2026-07-10 08:50:11', level: 'warn', message: 'High request velocity detected on /api/ai/write (Rate limiter engaged)', source: 'EdgeGateway' },
  { id: 'log-5', timestamp: '2026-07-10 08:22:00', level: 'success', message: 'Automated encrypted backup snapshot stored to AWS S3 / Supabase Storage', source: 'BackupDaemon' }
];
