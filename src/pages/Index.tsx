import { useState } from 'react';
import { Music, Piano, Layers, BookOpen, Headphones, GraduationCap, Globe, Guitar, Wrench, User } from 'lucide-react';
import ScaleExplorer from '@/components/ScaleExplorer';
import ChordProgressions from '@/components/ChordProgressions';
import SongStructures from '@/components/SongStructures';
import GenreGuide from '@/components/GenreGuide';
import ProductionGlossary from '@/components/ProductionGlossary';
import InstrumentGuide from '@/components/InstrumentGuide';
import MusicTools from '@/components/MusicTools';
import AboutMe from '@/components/AboutMe';

const tabs = [
  { id: 'glossary', label: 'Dictionary', icon: GraduationCap, description: 'Producer dictionary & prompt tips' },
  { id: 'instruments', label: 'Instruments', icon: Guitar, description: 'Learn how instruments sound' },
  { id: 'genres', label: 'Genres', icon: Globe, description: 'Genre knowledge base + samples' },
  { id: 'scales', label: 'Scales', icon: Piano, description: 'Music theory reference' },
  { id: 'chords', label: 'Chords', icon: Headphones, description: 'Chord progressions' },
  { id: 'structure', label: 'Structure', icon: Layers, description: 'Song arrangements' },
  { id: 'tools', label: 'Tools', icon: Wrench, description: 'Software & sites for producers' },
  { id: 'about', label: 'About', icon: User, description: 'About the creator' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('glossary');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 glass sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 glow-primary">
            <Music className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground text-glow">SoundTheory</h1>
            <p className="text-xs text-muted-foreground font-mono">AI Producer Curriculum — Zero to Hero</p>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-6">
        {/* Tab navigation */}
        <nav className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground glow-primary'
                    : 'bg-card text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Tab content */}
        {activeTab === 'glossary' && <ProductionGlossary />}
        {activeTab === 'instruments' && <InstrumentGuide />}
        {activeTab === 'scales' && <ScaleExplorer />}
        {activeTab === 'chords' && <ChordProgressions />}
        {activeTab === 'structure' && <SongStructures />}
        {activeTab === 'genres' && <GenreGuide />}
        {activeTab === 'tools' && <MusicTools />}
        {activeTab === 'about' && <AboutMe />}
      </main>
    </div>
  );
};

export default Index;
