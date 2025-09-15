import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Leaf, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, profile, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-card shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">GardenMed</span>
            </Link>
            
            {user && profile && (
              <div className="hidden md:flex space-x-6">
                {profile.role === 'admin' && (
                  <>
                    <Link 
                      to="/admin" 
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/admin') 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      Admin Dashboard
                    </Link>
                    <Link 
                      to="/sellers" 
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/sellers') 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      Manage Sellers
                    </Link>
                  </>
                )}
                
                {profile.role === 'seller' && (
                  <>
                    <Link 
                      to="/seller" 
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/seller') 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      Seller Dashboard
                    </Link>
                    <Link 
                      to="/inventory" 
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/inventory') 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      Inventory
                    </Link>
                  </>
                )}
                
                {profile.role === 'customer' && (
                  <Link 
                    to="/customer" 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/customer') 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
                
                <Link 
                  to="/plants" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/plants') 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  Plants
                </Link>
                
                <Link 
                  to="/medicines" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/medicines') 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  Medicines
                </Link>
                
                <Link 
                  to="/orders" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/orders') 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  Orders
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {profile ? `${profile.first_name} ${profile.last_name}` : user.email}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;