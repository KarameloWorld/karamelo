import type { FC } from 'react';

import Button from './Button';

interface SidebarProps {
  categories?: string[];
  onCategorySelect?: (category: string) => void;
  className?: string;
  selectedCategory?: string;
}

const Sidebar: FC<SidebarProps> = ({ 
  categories = ['Pop', 'Rock', 'Rap', 'Variété'],
  onCategorySelect,
  className = '',
  selectedCategory
}) => {
  return (
    <aside 
      className={`md:col-span-1 bg-gray-800/50 backdrop-blur-md rounded-lg p-6 sticky top-16 ${className}`.trim()}
      role="complementary"
      aria-label="Catégories musicales"
    >
      <div className="space-y-4">
        <h2 className="text-xl font-semibold" id="categories-heading">
          Catégories
        </h2>
        <nav className="space-y-2" role="navigation" aria-labelledby="categories-heading">
          {categories.map((category) => (
            <Button 
              key={category}
              variant={selectedCategory === category ? "primary" : "secondary"} 
              fullWidth
              onClick={() => onCategorySelect?.(category)}
              aria-pressed={selectedCategory === category}
              aria-label={`Sélectionner la catégorie ${category}`}
            >
              {category}
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;