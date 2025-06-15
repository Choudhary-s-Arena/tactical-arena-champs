
import { Link } from 'react-router-dom';
import { Target, Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-card/30 border-t border-tactical-teal/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-tactical-teal to-electric-blue rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-xl font-bold text-tactical-teal">
                CHOUDHARY
                <span className="block text-xs text-electric-blue tracking-widest">TOURNAMENTS</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Elite gaming tournaments where legends are forged. Join the battlefield and prove your tactical supremacy.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-tactical-teal hover:bg-tactical-gray">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-tactical-teal hover:bg-tactical-gray">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-tactical-teal hover:bg-tactical-gray">
                <Youtube className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-tactical-teal hover:bg-tactical-gray">
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-tactical-teal">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/tournaments" className="text-sm text-muted-foreground hover:text-tactical-teal transition-colors">Tournament Registration</Link></li>
              <li><Link to="/rules" className="text-sm text-muted-foreground hover:text-tactical-teal transition-colors">Rules & Regulations</Link></li>
              <li><Link to="/support" className="text-sm text-muted-foreground hover:text-tactical-teal transition-colors">Support Center</Link></li>
              <li><Link to="/winners" className="text-sm text-muted-foreground hover:text-tactical-teal transition-colors">Winners Archive</Link></li>
              <li><Link to="/rankings" className="text-sm text-muted-foreground hover:text-tactical-teal transition-colors">Player Rankings</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-tactical-teal">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-tactical-teal transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-tactical-teal transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-sm text-muted-foreground hover:text-tactical-teal transition-colors">Cookie Policy</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-tactical-teal transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-tactical-teal transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-tactical-teal">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest tournament updates and announcements.
            </p>
            <div className="space-y-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-tactical-gray border-tactical-teal/20 focus:border-tactical-teal"
              />
              <Button className="w-full btn-tactical text-white font-semibold">
                Subscribe
              </Button>
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Mail className="w-3 h-3" />
                <span>tournaments@choudhary.com</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Phone className="w-3 h-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>Gaming Arena, City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-tactical-teal/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Choudhary Tournaments. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">
            Built for elite gamers, by elite gamers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
