export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  readingTime: number
  category: string
  coverImage: string
  featured?: boolean
  tags: string[]
}

const dummyPosts: Post[] = [
  {
    id: "1",
    title: "The Future of AI: How Neural Networks Are Reshaping Industries",
    slug: "future-of-ai-neural-networks",
    excerpt:
      "Explore how advanced neural networks are transforming various industries and what this means for the future of work and innovation.",
    content:
      "Artificial intelligence, particularly neural networks, has seen exponential growth in capabilities over the past decade. These sophisticated systems are now capable of tasks that were once thought to be exclusively human domains.\n\nFrom healthcare to finance, transportation to creative arts, neural networks are reshaping how industries operate. In healthcare, AI systems can now diagnose certain conditions with accuracy rivaling that of experienced physicians. Financial institutions use neural networks for fraud detection, risk assessment, and algorithmic trading at scales impossible for human analysts.\n\nPerhaps most fascinating is how these systems are beginning to demonstrate creative capabilities. AI-generated art, music, and writing are becoming increasingly sophisticated, raising profound questions about the nature of creativity itself.\n\nAs these technologies continue to evolve, we're likely to see even more dramatic transformations across all sectors of the economy. The implications for employment are significant, with routine cognitive tasks increasingly automated. However, history suggests that technological revolutions tend to create new categories of work even as they eliminate others.\n\nThe key challenge for society will be ensuring that the benefits of this AI revolution are broadly shared, and that we develop these powerful tools in ways that augment human capabilities rather than simply replacing them. This will require thoughtful policy approaches, investment in education and training, and a commitment to developing AI systems that align with human values and needs.",
    date: "May 3, 2025",
    readingTime: 8,
    category: "Technology",
    coverImage: "/placeholder.svg?height=800&width=1200",
    featured: true,
    tags: ["AI", "Neural Networks", "Future of Work", "Technology Trends"],
  },
  {
    id: "2",
    title: "Quantum Computing: Breaking Down the Basics",
    slug: "quantum-computing-basics",
    excerpt:
      "A beginner-friendly guide to understanding quantum computing and its potential impact on computational problems previously thought unsolvable.",
    content:
      "Quantum computing represents one of the most exciting frontiers in computer science today. Unlike classical computers that use bits (0s and 1s), quantum computers leverage quantum bits or 'qubits' that can exist in multiple states simultaneously thanks to the principles of quantum mechanics.\n\nThis fundamental difference gives quantum computers the potential to solve certain problems exponentially faster than even the most powerful classical supercomputers. Problems like factoring large numbers, which forms the basis of much of our current encryption technology, or simulating complex molecular interactions for drug discovery, become tractable with sufficient quantum computing power.\n\nThe core quantum mechanical properties that enable this computational advantage are superposition and entanglement. Superposition allows qubits to exist in multiple states at once, while entanglement creates correlations between qubits that can be leveraged for computation.\n\nHowever, building practical quantum computers faces enormous engineering challenges. Qubits are extremely fragile and susceptible to environmental interference, requiring sophisticated error correction techniques and often extreme cooling to near absolute zero temperatures.\n\nDespite these challenges, companies like IBM, Google, and a host of startups are making remarkable progress. In 2019, Google claimed to achieve 'quantum supremacy' by performing a calculation that would be practically impossible on classical hardware.\n\nAs quantum computing continues to mature, we can expect transformative applications across fields ranging from cryptography and materials science to optimization problems in logistics and finance. While a quantum computer isn't likely to replace your laptop anytime soon, its impact on specific computational domains will be profound.",
    date: "May 1, 2025",
    readingTime: 10,
    category: "Science",
    coverImage: "/placeholder.svg?height=800&width=1200",
    tags: ["Quantum Computing", "Computer Science", "Technology", "Physics"],
  },
  {
    id: "3",
    title: "The Ethics of Autonomous Vehicles: Navigating Moral Dilemmas",
    slug: "ethics-autonomous-vehicles",
    excerpt:
      "Examining the complex ethical questions surrounding self-driving cars and how programmers are addressing impossible moral choices.",
    content:
      "As autonomous vehicles move from science fiction to reality, they bring with them a host of complex ethical dilemmas that have no easy answers. Perhaps the most discussed is the modern version of the trolley problem: how should a self-driving car be programmed to respond in an unavoidable accident scenario?\n\nImagine a situation where a self-driving car must choose between swerving to avoid pedestrians but endangering its passengers, or protecting its passengers at the cost of harming others. Who should the car be programmed to prioritize? Should it minimize total casualties? Protect the most vulnerable? Always save its passengers?\n\nUnlike human drivers who make split-second, instinctive decisions in emergencies, autonomous vehicles will follow pre-programmed ethics. This means engineers and policymakers must explicitly codify moral judgments in software—a responsibility with profound implications.\n\nBeyond crash scenarios, autonomous vehicles raise questions about data privacy, liability for accidents, potential job displacement for professional drivers, and how these vehicles might reshape our cities and transportation systems.\n\nDifferent cultures may also have varying perspectives on the right ethical framework. A study by MIT called the Moral Machine gathered data from millions of people worldwide, revealing significant cultural variations in ethical priorities for autonomous vehicles.\n\nAs we navigate these challenging questions, it's crucial that the development of autonomous vehicle ethics involves diverse stakeholders—not just engineers and companies, but ethicists, policymakers, and the broader public. The decisions we make will not only determine how these vehicles behave on our roads but also set precedents for how we approach ethics in other autonomous systems.",
    date: "April 28, 2025",
    readingTime: 7,
    category: "Ethics",
    coverImage: "/placeholder.svg?height=800&width=1200",
    tags: ["Autonomous Vehicles", "Ethics", "AI Ethics", "Transportation"],
  },
  {
    id: "4",
    title: "Neuroplasticity: How Your Brain Rewires Itself Throughout Life",
    slug: "neuroplasticity-brain-rewiring",
    excerpt:
      "Discover how your brain continues to form new neural connections throughout your entire life, challenging old beliefs about brain development.",
    content:
      "For much of the 20th century, neuroscientists believed that the adult brain was essentially fixed—that after a critical period in early childhood, neural connections were finalized and the brain's structure became static. This belief was captured in the phrase 'you can't teach an old dog new tricks.'\n\nWe now know this view was profoundly mistaken. The brain exhibits remarkable plasticity throughout our entire lives, constantly forming new neural connections and pruning unused ones in response to experience. This property, known as neuroplasticity, has revolutionary implications for our understanding of learning, recovery from injury, and cognitive health as we age.\n\nNeuroplasticity operates through several mechanisms. When we learn new skills, neurons that fire together strengthen their connections, making those pathways more efficient—a process captured in the phrase 'neurons that fire together, wire together.' Conversely, neural connections that go unused can weaken over time.\n\nThe implications of neuroplasticity are far-reaching. Stroke patients can sometimes recover lost functions as their brains reorganize to compensate for damaged areas. People with learning disabilities can develop alternative neural pathways to process information. And healthy adults can continue to learn and master new skills well into old age.\n\nPerhaps most exciting is how we can actively promote neuroplasticity. Activities that challenge the brain in novel ways—learning a musical instrument, studying a new language, or even changing your commute route—can stimulate the formation of new neural connections. Physical exercise, adequate sleep, and stress management also support the brain's plastic capabilities.\n\nWhile there are still limits to neuroplasticity, and it does tend to slow with age, the discovery that our brains remain changeable throughout life offers a profoundly hopeful message: we are never too old to learn, grow, and change.",
    date: "April 25, 2025",
    readingTime: 6,
    category: "Science",
    coverImage: "/placeholder.svg?height=800&width=1200",
    tags: ["Neuroscience", "Brain", "Learning", "Cognitive Science"],
  },
  {
    id: "5",
    title: "The Rise of Decentralized Finance: Beyond Traditional Banking",
    slug: "rise-of-defi",
    excerpt:
      "An exploration of how DeFi platforms are creating financial systems that operate without traditional intermediaries like banks and brokerages.",
    content:
      "Decentralized Finance, or DeFi, represents one of the most significant innovations to emerge from blockchain technology. At its core, DeFi aims to recreate traditional financial systems—lending, borrowing, trading, insurance, and more—without the need for centralized intermediaries like banks, brokerages, or insurance companies.\n\nInstead of relying on trusted third parties, DeFi applications use smart contracts—self-executing code running on blockchain networks like Ethereum—to facilitate financial transactions. These smart contracts automatically enforce the terms of an agreement, eliminating the need for intermediaries and potentially reducing costs, increasing accessibility, and improving transparency.\n\nThe DeFi ecosystem has grown explosively in recent years, with applications spanning nearly every aspect of finance. Lending platforms allow users to earn interest by providing liquidity or to borrow assets by posting collateral. Decentralized exchanges enable peer-to-peer trading without a central authority. Synthetic assets let users gain exposure to traditional financial instruments without actually owning them.\n\nOne of the most revolutionary aspects of DeFi is its potential for financial inclusion. Anyone with an internet connection can access DeFi services, regardless of their location, wealth, or status—a stark contrast to traditional finance, which leaves billions of people globally underbanked or unbanked.\n\nHowever, DeFi also faces significant challenges. Smart contract vulnerabilities have led to numerous hacks and exploits. Regulatory uncertainty looms large, as governments worldwide grapple with how to approach these novel financial systems. And the technical complexity of DeFi creates barriers to mainstream adoption.\n\nDespite these challenges, DeFi continues to innovate at a breathtaking pace. Whether it will ultimately complement or disrupt traditional finance remains to be seen, but its impact on how we think about financial systems is already profound.",
    date: "April 22, 2025",
    readingTime: 9,
    category: "Finance",
    coverImage: "/placeholder.svg?height=800&width=1200",
    tags: ["DeFi", "Blockchain", "Finance", "Cryptocurrency"],
  },
  {
    id: "6",
    title: "Synthetic Biology: Engineering Life for a Sustainable Future",
    slug: "synthetic-biology-sustainable-future",
    excerpt:
      "How scientists are redesigning biological systems to address global challenges from climate change to medicine and manufacturing.",
    content:
      "Synthetic biology stands at the intersection of biology, engineering, and computer science, offering unprecedented capabilities to design and construct new biological parts, devices, and systems—or to redesign existing natural biological systems for useful purposes.\n\nUnlike traditional genetic engineering, which typically involves transferring a single gene between organisms, synthetic biology takes a more systematic, engineering-driven approach. Scientists in this field draw inspiration from computer engineering, treating DNA as a programming language and cells as hardware that can be reprogrammed to perform new functions.\n\nThe potential applications of synthetic biology span virtually every sector of our economy. In healthcare, engineered cells could produce therapeutic compounds on demand or function as living diagnostics and treatments. For environmental challenges, synthetic organisms might capture carbon dioxide, remediate pollution, or produce biofuels from renewable sources.\n\nIn materials science and manufacturing, biological systems could produce complex materials with properties unattainable through conventional chemistry—from self-healing concrete to biodegradable plastics with performance exceeding their petroleum-based counterparts.\n\nPerhaps most revolutionary is the potential to create entirely new biological systems with functions not found in nature. Scientists have already expanded the genetic code beyond the four natural DNA bases, creating organisms that can incorporate novel amino acids into proteins, opening possibilities for materials and medicines with unprecedented properties.\n\nHowever, these powerful capabilities raise important ethical questions about biosafety, biosecurity, and our relationship with the natural world. As we gain the ability to engineer life itself, we must carefully consider not just what we can do, but what we should do.\n\nWith thoughtful governance and ethical frameworks, synthetic biology offers a powerful set of tools to address some of humanity's most pressing challenges—from climate change to food security to healthcare—while potentially creating a more sustainable relationship between technology and the natural world.",
    date: "April 19, 2025",
    readingTime: 8,
    category: "Science",
    coverImage: "/placeholder.svg?height=800&width=1200",
    tags: ["Synthetic Biology", "Biotechnology", "Sustainability", "Science"],
  },
  {
    id: "7",
    title: "The Psychology of Decision-Making: Why We Make Irrational Choices",
    slug: "psychology-decision-making",
    excerpt:
      "Understanding the cognitive biases and heuristics that influence our everyday decisions and how to make better choices.",
    content:
      "Human decision-making is far less rational than we'd like to believe. While we often think of ourselves as logical beings carefully weighing evidence before making choices, decades of research in cognitive psychology and behavioral economics tell a different story.\n\nOur brains rely heavily on mental shortcuts called heuristics to navigate the complexity of daily life. These shortcuts generally serve us well, allowing us to make quick decisions without becoming paralyzed by analysis. However, they also lead to systematic biases that can result in irrational or suboptimal choices.\n\nConfirmation bias leads us to favor information that supports our existing beliefs while discounting contradictory evidence. The availability heuristic causes us to overestimate the likelihood of events that come easily to mind, such as dramatic news stories. Loss aversion makes us feel the pain of losses more acutely than the pleasure of equivalent gains, often leading to overly conservative decisions.\n\nThese biases affect decisions in all domains of life—from personal finance and health choices to career decisions and relationships. They're particularly problematic in high-stakes situations or when we face complex trade-offs with long-term consequences.\n\nFortunately, understanding these biases is the first step toward mitigating them. Strategies like deliberately seeking out disconfirming evidence, using structured decision-making frameworks, consulting diverse perspectives, and creating psychological distance before important decisions can all help overcome our natural tendencies toward irrationality.\n\nOrganizations can also design choice environments—or 'choice architecture'—to nudge people toward better decisions while preserving freedom of choice. Simple changes like making the healthier option the default or providing visual feedback on energy usage have proven effective in promoting better decisions without restricting options.\n\nBy understanding the psychology of decision-making, we can become more aware of our own biases and develop strategies to make more rational choices when it matters most.",
    date: "April 16, 2025",
    readingTime: 7,
    category: "Psychology",
    coverImage: "/placeholder.svg?height=800&width=1200",
    tags: ["Psychology", "Decision Making", "Cognitive Biases", "Behavioral Economics"],
  },
  {
    id: "8",
    title: "The Microbiome Revolution: How Bacteria Shape Our Health",
    slug: "microbiome-revolution-health",
    excerpt:
      "New research reveals how the trillions of microbes living in and on us influence everything from digestion to mental health.",
    content:
      "We are never truly alone. Each of us carries trillions of microorganisms—bacteria, viruses, fungi, and other life forms—that collectively make up our microbiome. Far from being passive hitchhikers, these microscopic companions play crucial roles in virtually every aspect of our health.\n\nThe human gut alone hosts approximately 100 trillion microbes, representing thousands of species and containing more genes than our own human genome. This complex ecosystem helps us digest food, produces essential vitamins, trains our immune system, and even communicates with our brain through what scientists call the gut-brain axis.\n\nResearch over the past decade has revealed surprising connections between the microbiome and conditions ranging from inflammatory bowel disease and obesity to depression, anxiety, and neurodegenerative disorders. The composition of our gut microbiota may influence how we respond to medications, how effectively we fight infections, and even our personality traits and food preferences.\n\nOur modern lifestyle has dramatically altered our relationship with these microbial partners. Antibiotics, while lifesaving, can disrupt microbial communities. Highly processed diets, reduced contact with natural environments, and increased hygiene have all contributed to less diverse microbiomes compared to our ancestors or contemporary hunter-gatherer societies.\n\nThis has led some researchers to propose the 'old friends hypothesis'—the idea that losing contact with microorganisms we co-evolved with may contribute to the rise of allergies, autoimmune conditions, and inflammatory disorders in developed nations.\n\nAs our understanding of the microbiome grows, so do potential therapeutic applications. Fecal microbiota transplants have shown remarkable success in treating recurrent C. difficile infections. Probiotics, prebiotics, and precision modifications of the microbiome hold promise for conditions ranging from inflammatory bowel disease to metabolic disorders.\n\nThe microbiome revolution challenges us to reconsider what it means to be human. We are not just individuals but complex ecosystems—superorganisms whose health depends on maintaining a balanced relationship with our microbial partners.",
    date: "April 13, 2025",
    readingTime: 8,
    category: "Health",
    coverImage: "/placeholder.svg?height=800&width=1200",
    tags: ["Microbiome", "Health", "Bacteria", "Medicine"],
  },
  {
    id: "9",
    title: "The Future of Work: Adapting to Automation and AI",
    slug: "future-work-automation-ai",
    excerpt:
      "How artificial intelligence and automation are transforming employment and what skills will be most valuable in the coming decades.",
    content:
      "The world of work is undergoing a transformation as profound as the Industrial Revolution. Advances in artificial intelligence, robotics, and automation are rapidly changing not just how we work, but what work we do—and in some cases, whether human work is needed at all for certain tasks.\n\nUnlike previous waves of technological change that primarily automated physical labor, today's technologies increasingly perform cognitive tasks once thought to require human intelligence. AI systems can now write articles, create artwork, diagnose diseases, and even code software. This raises fundamental questions about the future role of human labor in the economy.\n\nSome jobs will undoubtedly disappear. Routine, predictable work—whether physical or cognitive—is most vulnerable to automation. However, history suggests that technological revolutions tend to create more jobs than they eliminate, though often in entirely new categories that couldn't have been imagined beforehand.\n\nThe skills most likely to remain valuable in this changing landscape are those that machines struggle with: creative problem-solving, emotional intelligence, ethical judgment, interpersonal communication, and the ability to work effectively in diverse teams. Jobs requiring care, creativity, and complex social interactions are likely to grow in importance.\n\nAdapting to this future requires rethinking education and training. The traditional model of front-loading education in the first two decades of life followed by a career applying that knowledge is becoming obsolete. Instead, continuous learning and periodic reskilling will become the norm as the half-life of skills continues to shorten.\n\nPolicy innovations like portable benefits, universal basic income, or stakeholder grants may help smooth the transition and ensure that the benefits of automation are broadly shared. Companies that invest in human-machine collaboration rather than simple labor substitution are likely to find the most sustainable paths forward.\n\nThe future of work will be shaped not just by technological possibilities but by the choices we make as societies about how to harness these powerful tools. With thoughtful approaches to education, policy, and organizational design, we can create a future where technology enhances human potential rather than simply replacing it.",
    date: "April 10, 2025",
    readingTime: 9,
    category: "Technology",
    coverImage: "/placeholder.svg?height=800&width=1200",
    tags: ["Future of Work", "AI", "Automation", "Employment"],
  },
  {
    id: "10",
    title: "Space Exploration in the 2020s: The New Space Race",
    slug: "space-exploration-2020s",
    excerpt:
      "How private companies and national space agencies are collaborating and competing to push the boundaries of human presence in space.",
    content:
      "Space exploration is experiencing a renaissance unlike anything seen since the Apollo era. What makes this new space age distinct is the unprecedented collaboration—and competition—between traditional government space agencies and private companies with ambitious visions for humanity's future beyond Earth.\n\nCompanies like SpaceX, Blue Origin, and Rocket Lab have dramatically reduced launch costs through innovations like reusable rockets, making space more accessible than ever before. What once required the resources of a superpower can now be accomplished by private enterprises or smaller nations.\n\nThis democratization of access to space has accelerated plans for lunar exploration. NASA's Artemis program aims to return humans to the Moon by the mid-2020s, this time with international partners and commercial participation. Unlike Apollo, the goal isn't just to visit but to establish a sustainable presence that can serve as a proving ground for eventual Mars missions.\n\nMars itself remains the horizon goal for human exploration. SpaceX's Starship vehicle, designed to carry up to 100 people to the Red Planet, represents the most ambitious plan to establish a human presence on another world. Meanwhile, robotic missions continue to pave the way, with rovers like Perseverance searching for signs of ancient life and testing technologies for future human explorers.\n\nBeyond the Moon and Mars, the outer solar system is being explored by increasingly sophisticated robotic missions. NASA's Europa Clipper will investigate Jupiter's icy moon, a potential harbor for extraterrestrial life in its subsurface ocean. Private ventures are even beginning to contemplate asteroid mining operations that could one day access the vast mineral wealth of the solar system.\n\nSpace telescopes like the James Webb are revolutionizing our understanding of the cosmos, peering deeper into space and time than ever before, while a new generation of exoplanet hunters search for potentially habitable worlds around other stars.\n\nThis new space age faces significant challenges, from the technical difficulties of long-duration spaceflight to questions about space governance and preventing militarization. Yet the convergence of technological capability, commercial interest, and renewed national commitments suggests that the coming decades may see humanity become a truly spacefaring civilization.",
    date: "April 7, 2025",
    readingTime: 10,
    category: "Space",
    coverImage: "/placeholder.svg?height=800&width=1200",
    tags: ["Space Exploration", "NASA", "SpaceX", "Mars"],
  },
  {
    id: "11",
    title: "The Science of Happiness: What Really Makes Us Content",
    slug: "science-of-happiness",
    excerpt:
      "Research from positive psychology reveals surprising insights about what truly contributes to human happiness and wellbeing.",
    content:
      "What makes us happy? This deceptively simple question has been the subject of philosophical inquiry for millennia, but only in recent decades has it become the focus of rigorous scientific research through the field of positive psychology.\n\nThe findings often challenge our intuitions. Many of the things we believe will make us happy—wealth beyond our basic needs, material possessions, even achieving major life goals—typically provide only temporary boosts in happiness before we adapt and return to our baseline. Psychologists call this phenomenon 'hedonic adaptation' or the 'hedonic treadmill.'\n\nSo what does reliably contribute to lasting happiness? Research points to several key factors. Strong social connections consistently emerge as the most powerful predictor of wellbeing across cultures. People with deep, supportive relationships are happier, healthier, and even live longer than those who are socially isolated.\n\nPurposeful engagement—involvement in activities that provide a sense of meaning, accomplishment, and flow (a state of complete immersion)—also contributes significantly to wellbeing. This can come through work, hobbies, volunteering, or creative pursuits that align with our values and utilize our strengths.\n\nPhysical health practices like regular exercise, adequate sleep, and time in nature have surprisingly powerful effects on mood and life satisfaction. Even brief daily meditation or mindfulness practices can increase happiness by helping us fully experience positive moments and reduce rumination on negative experiences.\n\nPerhaps most encouraging is research suggesting that happiness is somewhat malleable through intentional activities and mental habits. Practices like gratitude journaling, savoring positive experiences, performing acts of kindness, and cultivating an optimistic yet realistic thinking style can gradually shift our happiness baseline.\n\nThe science of happiness doesn't offer a one-size-fits-all prescription—individual differences in personality, circumstances, and values matter. But it does suggest that many of us might benefit from redirecting some of our energy from pursuing external achievements to cultivating the relationships, experiences, and mental habits that research shows contribute most reliably to a life well-lived.",
    date: "April 4, 2025",
    readingTime: 7,
    category: "Psychology",
    coverImage: "/placeholder.svg?height=800&width=1200",
    tags: ["Happiness", "Positive Psychology", "Wellbeing", "Mental Health"],
  },
  {
    id: "12",
    title: "The Metaverse: Building the Next Internet",
    slug: "metaverse-next-internet",
    excerpt:
      "Exploring the vision of an immersive, persistent virtual world that could become the next evolution of the internet.",
    content:
      "The metaverse—a term coined by science fiction author Neal Stephenson in his 1992 novel Snow Crash—refers to a persistent, shared, 3D virtual space where users can interact with digital environments and each other through avatars. Once confined to the realm of science fiction, the metaverse is now being actively built by some of the world's largest technology companies and countless startups.\n\nWhile definitions vary, the metaverse is generally envisioned as an evolution of the internet from 2D websites and apps to immersive 3D spaces that blend aspects of social media, online gaming, augmented reality (AR), virtual reality (VR), and cryptocurrencies. Unlike traditional online experiences, the metaverse would be persistent (continuing to exist when you're not there), synchronous (happening in real time), and interoperable (allowing you to take digital assets from one place to another).\n\nProponents envision a future where we might attend virtual concerts with friends from around the world, collaborate with colleagues in virtual offices, attend classes in virtual schools, or shop in virtual malls—all with a sense of presence and immersion far beyond what's possible with today's technology.\n\nEnabling technologies for this vision include VR and AR hardware, high-speed networks, blockchain for digital ownership, and artificial intelligence for creating realistic environments and interactions. Companies like Meta (formerly Facebook), Microsoft, Epic Games, and Roblox are making major investments in building metaverse platforms and technologies.\n\nHowever, significant challenges remain. Technical hurdles include developing comfortable, affordable VR/AR hardware, solving networking challenges for real-time interaction at scale, and creating standards for interoperability. Social challenges include questions about privacy, digital identity, governance of virtual spaces, and the potential for addiction or escapism.\n\nPerhaps most fundamental is the question of whether people actually want to spend significant portions of their lives in virtual worlds. While immersive gaming and social platforms have found enthusiastic audiences, it remains to be seen whether the metaverse will become a mainstream phenomenon or remain a niche interest.\n\nWhat's clear is that the boundaries between physical and digital experiences continue to blur. Whether or not the full vision of the metaverse materializes, elements of it—from AR overlays on physical spaces to virtual gatherings—are likely to become increasingly common in our digital lives.",
    date: "April 1, 2025",
    readingTime: 8,
    category: "Technology",
    coverImage: "/placeholder.svg?height=800&width=1200",
    tags: ["Metaverse", "Virtual Reality", "Augmented Reality", "Digital Future"],
  },
]

// Helper functions to get posts
export function getPosts(): Post[] {
  return dummyPosts
}

export function getPostBySlug(slug: string): Post | undefined {
  return dummyPosts.find((post) => post.slug === slug)
}

export function getFeaturedPosts(): Post[] {
  return dummyPosts.filter((post) => post.featured)
}

export function getRecentPosts(count: number): Post[] {
  return [...dummyPosts]
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, count)
}

export function getRelatedPosts(currentSlug: string, count: number): Post[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  return dummyPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.category === currentPost.category || post.tags.some((tag) => currentPost.tags.includes(tag)))
    .slice(0, count)
}
