import json
import random
import os

categories_map = {
    "politics": "Politics",
    "market": "Market",
    "finance": "Finance",
    "tech": "Tech",
    "business": "Business",
    "sports": "Sports"
}

descriptions = {
    "politics": "Inside coverage of governance, policymaking, and political developments.",
    "market": "In-depth analysis of global trade, commodities, and market indices.",
    "finance": "Personal wealth, digital assets, sovereign currencies, and investment strategies.",
    "tech": "Next-generation breakthroughs, artificial intelligence, quantum computing, and consumer tech.",
    "business": "Corporate strategy, hybrid work trends, venture capital, and industrial shifts.",
    "sports": "Elite athletics, sports technology, industry trends, and global competitions."
}

authors = [
    {"name": "David Smith", "image": "https://i.pravatar.cc/150?u=david"},
    {"name": "Sarah Jenkins", "image": "https://i.pravatar.cc/150?u=sarah"},
    {"name": "Michael Chen", "image": "https://i.pravatar.cc/150?u=michael"},
    {"name": "Emily Rodriguez", "image": "https://i.pravatar.cc/150?u=emily"},
    {"name": "Jessica Wu", "image": "https://i.pravatar.cc/150?u=jessica"},
    {"name": "Alex Thorne", "image": "https://i.pravatar.cc/150?u=alex"},
    {"name": "Maria Sanchez", "image": "https://i.pravatar.cc/150?u=maria"},
    {"name": "James O'Connor", "image": "https://i.pravatar.cc/150?u=james"},
    {"name": "Robert Miller", "image": "https://i.pravatar.cc/150?u=robert"}
]

topics = {
    "Politics": [
        ("global-diplomacy-digital-sovereignty-2026", "The Future of Global Diplomacy: Beyond Traditional Borders", "Shift in international relations as digital sovereignty becomes a key bargaining chip."),
        ("electoral-reforms-digital-voting-security", "Electoral Reforms: Can Digital Voting Ever Be Truly Secure?", "A deep dive into the blockchain-based voting systems being trialed in Northern Europe."),
        ("taxing-the-multinationals-2026-policy", "Taxing the Giants: Global Minimum Tax Reaches 20%", "A historic milestone in international tax law as 140 countries implement the 20% floor."),
        ("high-speed-rail-infrastructure-approved", "Blueprint for the Future: National High-Speed Rail Network Approved", "A multi-trillion dollar investment into clean transportation infrastructure takes flight."),
        ("midterm-elections-legislative-impact-2026", "The 2026 Midterm Shift: A Deep Dive into the Battle for the House", "As the midterm elections approach, political analysts are witnessing a seismic shift."),
        ("ocean-territory-disputes-treaty-arctic", "The High Seas Treaty: Resolving Arctic Territory Disputes", "New legislative frameworks aim to protect deep-sea biodiversity while managing mineral rights."),
        ("climate-policy-carbon-tax-economic", "Climate Policy Shift: Economic Giants Align on Carbon Taxes", "Major powers agree on a unified carbon pricing framework to accelerate the green transition."),
        ("decentralized-governance-dao-municipal-budgets", "The Rise of DAOs: Could Decentralized Governance Replace City Councils?", "How smart contracts are beginning to manage local municipal budgets and urban planning.")
    ],
    "Market": [
        ("commodity-supercycle-electrification-metals", "The 2026 Commodity Supercycle: Why Industrial Metals are the New Gold", "Rare earth elements and copper hit record highs as electrification demand outstrips supply."),
        ("emerging-markets-tech-hubs-valuation", "The Next Silicon Valleys: Emerging Market Tech Ecosystems Explode", "Valuations in Nairobi and Ho Chi Minh City startups signal a shift in global VC allocation."),
        ("blockchain-integration-markets-settlement", "Instant Liquidity: Moving Markets to T+0 Settlement", "How blockchain integration is eliminating the two-day settlement window for equity trades."),
        ("volatility-index-ai-trading-psychology", "The VIX in the Age of AI: Is Volatility Being Suppressed or Hidden?", "Algorithms now control 90% of intraday moves, fundamentally changing market psychology."),
        ("green-bonds-debt-sustainable-infrastructure", "Green Bonds Reach $5 Trillion: The Mainstreaming of ESG Debt", "Institutional investors flee traditional energy debt for certified sustainable infrastructure bonds."),
        ("altcoin-etf-capital-inflow-record", "The Second Wave: Institutional Capital Floods Ethereum and Solana ETFs", "Spot ETFs for altcoins receive regulatory approval, bringing trillions into the digital asset space."),
        ("real-estate-tokenization-fractional-shares", "Fractional Ownership: How Tokenization is Unlocking Real Estate Markets", "High-rise commercial properties are being broken into digital shares, allowing retail participation."),
        ("interest-rate-pivot-central-bank-cuts", "Beyond the Peak: Central Banks Signal the First Cut in Three Years", "Markets prepare for a gradual easing cycle as inflation stays within target ranges globally.")
    ],
    "Finance": [
        ("personal-wealth-management-ai-advisors", "The AI Financial Advisor: Democratizing Elite Wealth Management", "Sophisticated wealth strategies are now accessible to retail investors through low-cost AI platforms."),
        ("retirement-planning-longevity-portfolios", "Planning for 100: How Increased Longevity is Changing Retirement Math", "Financial planners adjust models as life expectancy increases, requiring more resilient portfolios."),
        ("central-bank-digital-currencies-pilot", "The Digital Dollar: Fed Launches Pilot for Institutional CBDC", "A significant step toward the modernization of the US payment system begins its trial phase."),
        ("pension-fund-private-equity-strategy", "Pensions Pivot: Increasing Exposure to Private Equity and Infrastructure", "Retirement funds look beyond public equities to ensure long-term returns in a low-growth era."),
        ("banking-sector-branchless-mobile-future", "The Branchless Future: Legacy Banks Finally Close Physical Retail Gaps", "Traditional banking giants complete their shift to mobile-first operations, shuttering legacy branches."),
        ("sustainable-finance-taxonomy-greenwashing", "The Sustainable Finance Map: Aligning Global Green Definitions", "Regulators finally agree on what constitutes a 'green' investment, reducing greenwashing risks."),
        ("micro-investing-fractional-revolution", "The Fractional Revolution: How $5 Can Buy a Piece of the S&P 500", "Micro-investing apps continue to grow, bringing a new generation into the equity markets."),
        ("inflation-hedging-strategies-tangible-assets", "Hedging for the 20s: Tangible Assets Overcome Monetary Inflation", "Investors look toward farmland, timber, and fine art to protect purchasing power.")
    ],
    "Tech": [
        ("generative-video-hollywood-production-ai", "Generative Video: The Hollywood Disruption is Ahead of Schedule", "New AI models can now produce cinematically consistent scenes from simple text prompts."),
        ("quantum-computing-error-correction-milestone", "Quantum Stability: The Error Correction Breakthrough of 2026", "Researchers achieve a fault-tolerant qubit threshold, bringing practical quantum computing closer."),
        ("augmented-reality-glasses-mass-adoption", "AR for Everyone: The First Lightweight, Stylish Augmented Reality Glasses", "Tech giants launch consumer-grade AR wearables that finally look like normal eyewear."),
        ("solid-state-battery-ev-range-industry", "1,000 Kilometers: Solid-State Batteries Enter Mass Production", "The range anxiety era for EVs ends as solid-state technology doubles energy density."),
        ("satellite-internet-constellations-starlink", "Starlink Competition Heats Up: The Battle for Low-Earth Orbit", "New constellations from Europe and Asia provide high-speed internet to the remotest corners of Earth."),
        ("cybersecurity-bio-sensing-continuous-auth", "Beyond Passwords: Bio-Sensing and the Era of Continuous Authentication", "Security systems move to real-time biometric verification to prevent identity theft."),
        ("edge-computing-smart-grid-optimization", "Thinking Power: How AI is Optimizing National Energy Grids", "Real-time processing at the edge allows for a more responsive and efficient electrical grid."),
        ("sovereign-cloud-data-privacy-laws", "The Sovereign Cloud: Why Nations are Building Their Own Data Moats", "Privacy concerns lead to the rise of regional cloud providers independent of the global giants.")
    ],
    "Business": [
        ("hybrid-work-equilibrium-retention-model", "The End of the Debate: Companies Settle on the 3-2 Hybrid Model", "New data shows peak productivity and employee retention align with a flexible office schedule."),
        ("startup-exit-strategies-ipo-scrutiny", "The Exit Landscape: Why IPOs are Preferred Over Tech Consolidations", "Regulatory scrutiny on Big Tech acquisitions drives founders toward the public markets."),
        ("reshoring-manufacturing-automated-smart-factories", "The Reshoring Wave: Manufacturing Returns to North America", "Highly automated smart factories allow companies to move production closer to consumers."),
        ("scope-3-carbon-supply-chain-reporting", "Scope 3 Transparency: The New Standard for Corporate Climate Responsibility", "New legislation requires every public company to audit the carbon footprint of their entire supply chain."),
        ("venture-capital-profitability-quality-seed", "VC Pivot: Quality Over Growth at Any Cost", "Venture funds are shifting focus back to early-stage profitability and sustainable unit economics."),
        ("mergers-acquisitions-aerospace-consolidation", "Industrial Titans Merge: A New Era of Global Manufacturing Efficiency", "Consolidation in the aerospace and defense sectors signals a more competitive global landscape."),
        ("subscription-fatigue-monetization-models", "Subscription Fatigue: The Shift Back to Ownership and Pay-Per-Use", "Consumers are cutting back on monthly fees, forcing digital services to rethink their monetization."),
        ("chief-purpose-officer-corporate-culture", "The Chief Purpose Officer: Why Culture is the Ultimate Competitive Advantage", "Companies are investing heavily in employee mental health and long-term career fulfillment.")
    ],
    "Sports": [
        ("ai-coaching-analytics-performance-tracking", "The AI Coach: How Real-Time Predictive Analytics is Revolutionizing Team Sports", "Elite teams leverage continuous biometrics and AI projections to make in-game coaching adjustments."),
        ("esports-olympics-inaugural-games-2026", "The Virtual Arena: Inaugural Olympic Esports Games Set to Begin in 2026", "Competitive gaming gains ultimate recognition as the IOC prepares for the first virtual Olympic events."),
        ("stadium-tech-smart-venues-fan-experience", "The Connected Stadium: Smart Venues Redefining the Live Fan Experience", "From holographic replays to autonomous concession delivery, stadiums undergo a digital revolution."),
        ("athlete-longevity-advanced-biomedical-recovery", "Extending the Peak: How Biomedical Recovery is Keeping Athletes Active Longer", "Hyperbaric chambers, targeted gene therapy, and stem-cell recovery extend elite athletic careers."),
        ("formula-e-electric-motorsport-innovations", "Silent Speed: Formula E Innovations Reshaping the Future of Electric Vehicles", "Racing innovations in battery thermal management translate directly to production consumer cars."),
        ("women-sports-broadcasting-revenue-records", "The Broadcast Boom: Women's Professional Sports Hit Historic Revenue Milestones", "Surging viewership drives record-breaking media rights deals and stadium sellouts globally."),
        ("wearable-sensors-concussion-prevention-safety", "Smart Armor: Sensor-Equipped Gear Leads the Charge in Athlete Concussion Prevention", "New impact-sensing helmets and mouthguards transmit real-time telemetry to medical staff on the sidelines."),
        ("sustainability-green-stadiums-net-zero-venues", "Green Venues: The Push for Net-Zero Energy in Professional Sports Stadiums", "How stadiums are integrating solar arrays, water recycling, and zero-waste policies into matchday operations.")
    ]
}

def generate_content(title, category, shortdescription):
    return [
        {
            "type": "intro",
            "text": f"In a rapidly evolving global landscape, {title} stands as a pivotal development in {category}. {shortdescription} This news piece delves into the layers of this story, exploring the motivations, the technology, and the far-reaching consequences of this event.",
            "hasDropCap": True
        },
        {
            "type": "paragraph",
            "text": "The details emerging from recent reports suggest that we are entering a new phase of international cooperation and technological integration. Experts argue that the previous frameworks are no longer sufficient to handle the complexity of modern systems. As we look toward the end of the decade, the decisions made today will echo through the next century of development."
        },
        {
            "type": "heading",
            "text": "The Core of the Transformation"
        },
        {
            "type": "paragraph",
            "text": "At the heart of this issue is a fundamental shift in how we perceive value and accessibility. By leveraging decentralized networks and advanced models, stakeholders are finding ways to bridge gaps that have existed for decades. This isn't just about efficiency; it's about a complete reimagining of the social and economic contract."
        },
        {
            "type": "quote",
            "text": "We are not just witnessing history; we are building the platforms that will define the next millennium. The era of traditional boundaries is giving way to a more fluid, interconnected world."
        },
        {
            "type": "paragraph",
            "text": "As the situation continues to unfold, we will remain dedicated to providing the most accurate and in-depth analysis. The intersection of policy, innovation, and human ambition continues to be the most exciting frontier of our time."
        }
    ]

data_dir = 'c:/Users/progr/OneDrive/Desktop/foxiz-p8/public/data/'
articles_dir = os.path.join(data_dir, 'articles/')
cat_news_dir = os.path.join(data_dir, 'categoryNews/')

os.makedirs(articles_dir, exist_ok=True)
os.makedirs(cat_news_dir, exist_ok=True)

# Clean existing articles
for f in os.listdir(articles_dir):
    if f.endswith('.json'):
        os.remove(os.path.join(articles_dir, f))

# Clean existing categories
for f in os.listdir(cat_news_dir):
    if f.endswith('.json'):
        os.remove(os.path.join(cat_news_dir, f))

all_articles_index = []

# Generate Articles
for cat_id, cat_name in categories_map.items():
    topic_list = topics.get(cat_name, [])
    for slug, title, short_desc in topic_list:
        author = random.choice(authors)
        image_id = random.randint(1500000000000, 1700000000000)
        image_url = f"https://images.unsplash.com/photo-{image_id}?q=80&w=1200&auto=format&fit=crop"
        
        # Index Data
        article_meta = {
            "slug": slug,
            "title": title,
            "shortdescription": short_desc,
            "category": cat_name,
            "author": author['name'],
            "date": "February 23, 2026",
            "image": image_url
        }
        all_articles_index.append(article_meta)
        
        # Detail Data
        detail_article = {
            "category": cat_name,
            "title": title,
            "author": {
                "name": author['name'],
                "image": author['image']
            },
            "date": "February 23, 2026",
            "image": image_url,
            "content": generate_content(title, cat_name, short_desc)
        }
        
        with open(os.path.join(articles_dir, f"{slug}.json"), 'w') as f:
            json.dump(detail_article, f, indent=4)

# Save all-articles-index.json
with open(os.path.join(data_dir, 'all-articles-index.json'), 'w') as f:
    json.dump(all_articles_index, f, indent=4)

# Save categoryNews files
for cat_id, cat_name in categories_map.items():
    posts = [a for a in all_articles_index if a['category'] == cat_name]
    category_data = {
        "title": cat_name,
        "id": cat_id,
        "description": descriptions.get(cat_id, f"Latest news and updates in {cat_name}."),
        "count": len(posts),
        "articles": posts
    }
    with open(os.path.join(cat_news_dir, f"{cat_id}.json"), 'w') as f:
        json.dump(category_data, f, indent=4)

# Populate Homepage JSON Config Files
all_shuffled = list(all_articles_index)
random.shuffle(all_shuffled)

# 1. home-hero.json
home_hero = {
    "featured": all_shuffled[0],
    "sideArticles": all_shuffled[1:4],
    "bottomArticles": all_shuffled[4:6],
    "mostRead": [
        {**art, "id": i+1} for i, art in enumerate(all_shuffled[6:11])
    ]
}
with open(os.path.join(data_dir, 'home-hero.json'), 'w') as f:
    json.dump(home_hero, f, indent=4)

# 2. featured-stories.json
featured_stories = {
    "stories": all_shuffled[11:15]
}
with open(os.path.join(data_dir, 'featured-stories.json'), 'w') as f:
    json.dump(featured_stories, f, indent=4)

# 3. news-strip.json
news_strip = {
    "items": all_shuffled[15:21]
}
with open(os.path.join(data_dir, 'news-strip.json'), 'w') as f:
    json.dump(news_strip, f, indent=4)

# 4. quick-links.json
quick_links = {
    "links": ["Politics", "Market", "Finance", "Tech", "Business", "Sports"]
}
with open(os.path.join(data_dir, 'quick-links.json'), 'w') as f:
    json.dump(quick_links, f, indent=4)

# 5. just-in.json
just_in = {
    "mainArticle": all_shuffled[21],
    "bottomArticles": all_shuffled[22:25]
}
with open(os.path.join(data_dir, 'just-in.json'), 'w') as f:
    json.dump(just_in, f, indent=4)

# 6. business.json (Business category specific)
business_articles = [a for a in all_articles_index if a['category'] == 'Business']
business_data = {
    "topArticles": business_articles[0:2],
    "bottomArticles": business_articles[2:5]
}
with open(os.path.join(data_dir, 'business.json'), 'w') as f:
    json.dump(business_data, f, indent=4)

# 7. what-to-read.json
what_to_read = {
    "mainArticle": all_shuffled[25],
    "gridArticles": all_shuffled[26:30]
}
with open(os.path.join(data_dir, 'what-to-read.json'), 'w') as f:
    json.dump(what_to_read, f, indent=4)

# 8. latest-news.json
latest_news = {
    "articles": all_shuffled[30:40]
}
with open(os.path.join(data_dir, 'latest-news.json'), 'w') as f:
    json.dump(latest_news, f, indent=4)

# 9. more-news.json
more_news = all_shuffled[10:22]
with open(os.path.join(data_dir, 'more-news.json'), 'w') as f:
    json.dump(more_news, f, indent=4)

# 10. most-read.json
most_read_list = [
    {
        "id": i+1,
        "slug": art["slug"],
        "title": art["title"],
        "image": art["image"]
    }
    for i, art in enumerate(all_shuffled[0:6])
]
with open(os.path.join(data_dir, 'most-read.json'), 'w') as f:
    json.dump(most_read_list, f, indent=4)

# 11. recentPosts.json
recent_posts = [
    {
        "title": art["title"],
        "category": art["category"],
        "slug": art["slug"]
    }
    for art in all_shuffled[4:9]
]
with open(os.path.join(data_dir, 'recentPosts.json'), 'w') as f:
    json.dump(recent_posts, f, indent=4)

print(f"Successfully rebuilt database for new categories: 48 articles generated.")
