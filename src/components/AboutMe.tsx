import { MapPin, GraduationCap, Music, Heart, Sparkles, ExternalLink } from 'lucide-react';

const AboutMe = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="glass rounded-xl p-6 md:p-8">
        {/* Hero */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-3xl shrink-0">
            🎵
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Godfrey Ainebyoona</h2>
            <p className="text-primary font-semibold text-sm font-mono mb-3">aka Kitara Kid</p>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
              A passionate student and AI music enthusiast building tools to make music production knowledge accessible to everyone. 
              iHarmony is my vision of empowering the next generation of AI-powered music creators — from zero to hero.
            </p>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="bg-secondary/50 rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Education</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Student at <span className="text-foreground font-medium">Metropolitan International University</span>
            </p>
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Origin</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Born in <span className="text-foreground font-medium">Kanungu District</span>, Western Uganda 🇺🇬
            </p>
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Music className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Passion</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI Music Production, Sound Design & Music Technology
            </p>
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Mission</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Making music education accessible through AI-powered learning tools
            </p>
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-foreground">Why I Built iHarmony</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          As someone from Kanungu in Western Uganda, access to professional music education wasn't always easy. 
          When AI music tools like Suno and Udio emerged, I saw an incredible opportunity — but realized most people 
          didn't know the music vocabulary needed to write great prompts. iHarmony bridges that gap. It's a free, 
          comprehensive curriculum that teaches you music theory, production terminology, genre knowledge, and prompt 
          engineering — everything you need to go from complete beginner to confident AI music producer.
        </p>
      </div>

      {/* Quote */}
      <div className="glass rounded-xl p-6 border-l-4 border-primary">
        <blockquote className="text-foreground italic text-sm leading-relaxed">
          "Music is the universal language. AI is making it possible for anyone, anywhere, to speak it fluently."
        </blockquote>
        <p className="text-xs text-muted-foreground mt-2 font-mono">— Kitara Kid</p>
      </div>

      {/* Links */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Music className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">My Music & Genre</h3>
        </div>
        <div className="space-y-3">
          <a
            href="https://www.mdundo.com/artist/kitara-kid"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Kitara Kid on Mdundo — All Tracks
          </a>
          <a
            href="https://mdundo.com/song/5737021#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-accent hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            🎧 Listen: Featured Song on Mdundo
          </a>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I also created an original genre called <span className="text-foreground font-semibold">Neon Griot Streetwave</span> — 
            a futuristic blend of metallic scrap percussion, glitchy neon synths, street-poet vocals, and ancient chant echoes. 
            Find it in the Genre Guide with a playable beat demo!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
