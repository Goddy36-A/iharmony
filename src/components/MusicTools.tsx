import { ExternalLink, Monitor, Globe, Headphones, Music, Mic, Wand2, Video, BookOpen } from 'lucide-react';

interface ToolEntry {
  name: string;
  description: string;
  url: string;
  category: 'daw' | 'ai' | 'learning' | 'distribution' | 'community' | 'plugins';
  free?: boolean;
}

const TOOLS: { category: string; icon: React.ReactNode; items: ToolEntry[] }[] = [
  {
    category: 'AI Music Generators',
    icon: <Wand2 className="w-5 h-5" />,
    items: [
      { name: 'Suno', description: 'AI music generation from text prompts — create full songs with vocals in seconds.', url: 'https://suno.com', category: 'ai', free: true },
      { name: 'Udio', description: 'High-quality AI music creation with fine-tuned genre control and remixing.', url: 'https://udio.com', category: 'ai', free: true },
      { name: 'AIVA', description: 'AI composer for film scores, game soundtracks, and orchestral pieces.', url: 'https://aiva.ai', category: 'ai', free: true },
      { name: 'Soundraw', description: 'Customizable AI music for content creators — adjust mood, tempo, and instruments.', url: 'https://soundraw.io', category: 'ai' },
      { name: 'Boomy', description: 'Create and release AI-generated songs to streaming platforms instantly.', url: 'https://boomy.com', category: 'ai', free: true },
      { name: 'Mubert', description: 'AI-generated royalty-free music streams for videos and apps.', url: 'https://mubert.com', category: 'ai' },
    ],
  },
  {
    category: 'Digital Audio Workstations (DAWs)',
    icon: <Monitor className="w-5 h-5" />,
    items: [
      { name: 'FL Studio', description: 'Industry-standard DAW with powerful piano roll, loved by hip-hop and electronic producers.', url: 'https://www.image-line.com', category: 'daw' },
      { name: 'Ableton Live', description: 'Creative DAW with session view for live performance and electronic music production.', url: 'https://www.ableton.com', category: 'daw' },
      { name: 'Logic Pro', description: "Apple's professional DAW with world-class instruments and mixing tools. Mac only.", url: 'https://www.apple.com/logic-pro/', category: 'daw' },
      { name: 'GarageBand', description: 'Free beginner-friendly DAW for Mac/iOS — perfect starting point for new producers.', url: 'https://www.apple.com/garageband/', category: 'daw', free: true },
      { name: 'BandLab', description: 'Free online DAW with collaboration features — works in your browser.', url: 'https://www.bandlab.com', category: 'daw', free: true },
      { name: 'Reaper', description: 'Lightweight, affordable professional DAW with extensive customization.', url: 'https://www.reaper.fm', category: 'daw' },
    ],
  },
  {
    category: 'Plugins & Virtual Instruments',
    icon: <Headphones className="w-5 h-5" />,
    items: [
      { name: 'Splice', description: 'Massive sample library and plugin marketplace — rent-to-own top plugins.', url: 'https://splice.com', category: 'plugins' },
      { name: 'Native Instruments', description: 'Kontakt, Massive, Battery — industry-standard virtual instruments and effects.', url: 'https://www.native-instruments.com', category: 'plugins' },
      { name: 'Serum (Xfer)', description: 'The most popular wavetable synthesizer for modern electronic music production.', url: 'https://xferrecords.com/products/serum', category: 'plugins' },
      { name: 'Vital', description: 'Free spectral warping wavetable synth — rivals premium synths.', url: 'https://vital.audio', category: 'plugins', free: true },
      { name: 'iZotope', description: 'Professional mixing and mastering tools — Ozone, Neutron, RX for audio repair.', url: 'https://www.izotope.com', category: 'plugins' },
    ],
  },
  {
    category: 'Learning & Theory',
    icon: <BookOpen className="w-5 h-5" />,
    items: [
      { name: 'Coursera (Music Production)', description: 'University-level courses on music production, theory, and songwriting.', url: 'https://www.coursera.org/courses', category: 'learning', free: true },
      { name: 'YouTube (Music Production)', description: 'Endless free tutorials — channels like Andrew Huang, You Suck at Producing, Simon Servida.', url: 'https://youtube.com', category: 'learning', free: true },
      { name: 'Hooktheory', description: 'Interactive music theory and songwriting tool — learn chords and melodies visually.', url: 'https://hooktheory.com', category: 'learning' },
      { name: 'musictheory.net', description: 'Free interactive lessons covering fundamentals of music theory.', url: 'https://www.musictheory.net', category: 'learning', free: true },
      { name: 'Skillshare', description: 'Creative classes on production, mixing, mastering, and music business.', url: 'https://www.skillshare.com', category: 'learning' },
    ],
  },
  {
    category: 'Distribution & Monetization',
    icon: <Globe className="w-5 h-5" />,
    items: [
      { name: 'DistroKid', description: 'Distribute unlimited music to Spotify, Apple Music, and 150+ stores for a flat fee.', url: 'https://distrokid.com', category: 'distribution' },
      { name: 'TuneCore', description: 'Music distribution and publishing administration — keep 100% of your royalties.', url: 'https://www.tunecore.com', category: 'distribution' },
      { name: 'SoundCloud', description: 'Upload and share your music — discover artists and build a following.', url: 'https://soundcloud.com', category: 'distribution', free: true },
      { name: 'Bandcamp', description: 'Sell your music directly to fans — artist-friendly platform with fair revenue split.', url: 'https://bandcamp.com', category: 'distribution', free: true },
      { name: 'Mdundo', description: 'Africa-focused music platform — huge in East Africa. Great for reaching Ugandan, Kenyan, and Tanzanian listeners.', url: 'https://mdundo.com', category: 'distribution', free: true },
      { name: 'Audiomack', description: 'Free music streaming and distribution — popular with hip-hop, Afrobeats, and emerging artists worldwide.', url: 'https://audiomack.com', category: 'distribution', free: true },
    ],
  },
  {
    category: 'Community & Collaboration',
    icon: <Mic className="w-5 h-5" />,
    items: [
      { name: 'Discord (Music Servers)', description: 'Join music production communities — get feedback, collaborate, and learn.', url: 'https://discord.com', category: 'community', free: true },
      { name: 'Reddit r/WeAreTheMusicMakers', description: 'Active community for music creators — tips, feedback, and industry discussion.', url: 'https://reddit.com/r/WeAreTheMusicMakers', category: 'community', free: true },
      { name: 'Kompoz', description: 'Online music collaboration platform — find musicians and create together remotely.', url: 'https://www.kompoz.com', category: 'community', free: true },
    ],
  },
];

const MusicTools = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="glass rounded-xl p-5">
        <h2 className="text-lg font-semibold text-foreground mb-1">
          🛠️ Essential Software & Sites for Musicians
        </h2>
        <p className="text-sm text-muted-foreground">
          The tools, platforms, and communities every modern music producer should know — from AI generators to DAWs to distribution.
        </p>
      </div>

      {TOOLS.map(group => (
        <div key={group.category} className="glass rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-border/50">
            <span className="text-primary">{group.icon}</span>
            <h3 className="font-semibold text-foreground">{group.category}</h3>
            <span className="text-xs text-muted-foreground font-mono ml-auto">{group.items.length} tools</span>
          </div>
          <div className="divide-y divide-border/30">
            {group.items.map(tool => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 hover:bg-secondary/30 transition-all group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{tool.name}</h4>
                    {tool.free && (
                      <span className="px-2 py-0.5 text-[10px] rounded-full border border-primary/30 bg-primary/10 text-primary font-mono uppercase tracking-wider">
                        Free
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary mt-1 shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MusicTools;
