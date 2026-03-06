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
      <header className="border-b border-border/30 glass sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-5 flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-primary/10 glow-primary">
            <Music className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-foreground text-glow tracking-tight">iHarmony</h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-mono tracking-wide">AI Producer Curriculum — Zero to Hero</p>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Tab navigation */}
        <nav className="flex gap-1.5 sm:gap-2.5 mb-6 sm:mb-10 overflow-x-auto pb-2 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground glow-primary shadow-md'
                    : 'bg-card/80 text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.length > 6 ? tab.label.slice(0, 5) + '.' : tab.label}</span>
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
