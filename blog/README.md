# TruthCheck News - Real Stories vs Misinformation

A 2000s aesthetic-themed news blog website designed to help users distinguish between verified real news stories and common misinformation.

## Features

### 🟢 Blue & Green 2000s Theme
- Vibrant cyan, lime green, and ocean blue color scheme
- Classic 2000s web design aesthetic
- Glowing shadows and neon effects
- Retro font styling with "Trebuchet MS"

### ✓ Real Stories Section
- Verified news stories from credible sources
- Each story includes:
  - Clear verification status
  - Story content
  - Source attribution
  - Publication date
- Blue/green themed cards for easy identification

### ✗ Misinformation Feed
- Common false stories and hoaxes
- Each story includes:
  - Clear "MISINFORMATION" label
  - False claim explanation
  - Red flags to identify similar misinformation
  - Why it's false
- Red-themed cards for immediate visual identification

### 🔍 Story Verification Tool
- Search and verify stories against the database
- Three possible results:
  - **Verified Real** - Green highlighted result
  - **Misinformation Detected** - Red highlighted result
  - **Not Found** - Yellow highlighted with tips for verification

## How to Use

1. **View Real Stories**: Click "Real Stories" tab to see verified news
2. **Learn About Misinformation**: Click "Misinformation Feed" to see common false stories and red flags
3. **Verify a Story**: Use the "Verify a Story" tab to search for specific news items

## File Structure

```
blog/
├── index.html       # Main page structure
├── styles.css       # 2000s aesthetic styling
├── script.js        # Interactive functionality
└── README.md        # This file
```

## Color Scheme

- **Header**: Cyan to Blue gradient (#00cc99 to #0099ff)
- **Real Stories**: Green/Blue theme (rgba colors)
- **Misinformation**: Red/Orange theme (rgba colors)
- **Background**: Dark green gradient
- **Accents**: Neon cyan and lime green

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (Vanilla)** - Interactive tab switching and story verification

## How Stories Are Verified

The verification system checks user input against:
1. A database of verified real stories with multiple credible sources
2. A database of known misinformation with explanations of why they're false
3. If not found, provides general fact-checking tips

## Tips for Identifying Misinformation

Red flags to watch for:
- ❌ No credible source attribution
- ❌ Sensational headlines designed to provoke emotion
- ❌ Contradicts basic science or physics
- ❌ Only appears on unverified social media
- ❌ Poor grammar and spelling
- ❌ No dates or vague timing
- ❌ Claims that "they don't want you to know this"
- ❌ Missing context or old stories presented as new

## Fact-Checking Resources

Use these trusted sources to verify stories:
- [Snopes.com](https://www.snopes.com/) - Urban legends and misinformation
- [FactCheck.org](https://www.factcheck.org/) - Political claims
- [PolitiFact](https://www.politifact.com/) - Political fact-checking
- [NASA](https://www.nasa.gov/) - Space and climate science
- [CDC](https://www.cdc.gov/) - Health and medical information
- [WHO](https://www.who.int/) - Global health

## Future Enhancements

- [ ] Add API integration for real-time news data
- [ ] Implement user-submitted story verification
- [ ] Add social media sharing verification
- [ ] Create difficulty levels for misinformation detection game
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Real-time fact-checking database updates

## Contributing

To add more stories to the database, edit `script.js` and add to either:
- `newsDatabase.real` - for verified stories
- `newsDatabase.misinformation` - for false stories

## Disclaimer

This educational tool is designed to teach critical thinking about news and information sources. Always verify important information with multiple credible sources before making decisions.

---

**Created with a focus on media literacy and critical thinking** 🔍✓✗