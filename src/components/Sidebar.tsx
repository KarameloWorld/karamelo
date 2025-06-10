import Button from './Button';

interface SidebarProps {
  categories?: string[];
  onCategorySelect?: (category: string) => void;
}

export default function Sidebar({ 
  categories = ['Pop', 'Rock', 'Rap', 'Variété'],
  onCategorySelect 
}: SidebarProps) {
  return (
    <aside className="md:col-span-1 bg-gray-800/50 backdrop-blur-md rounded-lg p-6 sticky top-16">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Catégories</h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button 
              key={category}
              variant="primary" 
              fullWidth
              onClick={() => onCategorySelect?.(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
}