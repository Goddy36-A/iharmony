import { useState } from 'react';
import { GLOSSARY, LEVEL_COLORS, type GlossaryCategory } from '@/lib/glossary-data';
import { Search, Sparkles, ChevronDown, ChevronRight } from 'lucide-react';

const ProductionGlossary = () => {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(GLOSSARY.map(c => c.name))
  );

  const toggleCategory = (name: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const filteredGlossary = GLOSSARY.map(category => ({
    ...category,
    terms: category.terms.filter(term => {
      const matchesSearch = !search ||
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        term.description.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = !levelFilter || term.level === levelFilter;
      return matchesSearch && matchesLevel;
    }),
  })).filter(category => category.terms.length > 0);

  const totalTerms = GLOSSARY.reduce((sum, c) => sum + c.terms.length, 0);
  const shownTerms = filteredGlossary.reduce((sum, c) => sum + c.terms.length, 0);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="glass rounded-xl p-5">
        <h2 className="text-lg font-semibold text-foreground mb-1">
          🎓 Zero to Hero: Music Production Glossary
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          {totalTerms} essential terms with AI prompt tips. Master these to craft better music prompts.
        </p>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search terms... (e.g., autotune, BPM, chorus)"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Level filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setLevelFilter(null)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              !levelFilter ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            All Levels ({totalTerms})
          </button>
          {(['beginner', 'intermediate', 'advanced'] as const).map(level => {
            const count = GLOSSARY.reduce((sum, c) => sum + c.terms.filter(t => t.level === level).length, 0);
            return (
              <button
                key={level}
                onClick={() => setLevelFilter(levelFilter === level ? null : level)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all border ${
                  levelFilter === level ? LEVEL_COLORS[level] : 'bg-secondary text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)} ({count})
              </button>
            );
          })}
          <span className="ml-auto text-xs text-muted-foreground self-center font-mono">
            {shownTerms} shown
          </span>
        </div>
      </div>

      {/* Categories */}
      {filteredGlossary.map(category => (
        <div key={category.name} className="glass rounded-xl overflow-hidden">
          {/* Category header */}
          <button
            onClick={() => toggleCategory(category.name)}
            className="w-full flex items-center gap-3 p-4 hover:bg-secondary/50 transition-all text-left"
          >
            <span className="text-xl">{category.icon}</span>
            <span className="font-semibold text-foreground flex-1">{category.name}</span>
            <span className="text-xs text-muted-foreground font-mono mr-2">{category.terms.length} terms</span>
            {expandedCategories.has(category.name) ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </button>

          {/* Terms */}
          {expandedCategories.has(category.name) && (
            <div className="border-t border-border/50">
              {category.terms.map((term, i) => (
                <div
                  key={term.term}
                  className={`p-4 space-y-2 ${i > 0 ? 'border-t border-border/30' : ''} hover:bg-secondary/30 transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-foreground">{term.term}</h4>
                        <span className={`px-2 py-0.5 text-[10px] rounded-full border font-mono uppercase tracking-wider ${LEVEL_COLORS[term.level]}`}>
                          {term.level}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{term.description}</p>
                    </div>
                  </div>

                  {term.promptTip && (
                    <div className="flex items-start gap-2 pl-0 mt-2 p-2.5 rounded-lg bg-primary/5 border border-primary/10">
                      <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <p className="text-xs text-primary/90 font-mono leading-relaxed">{term.promptTip}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductionGlossary;
