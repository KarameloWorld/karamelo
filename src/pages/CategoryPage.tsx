import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import Card, { CardHeader, CardTitle, CardContent } from '../components/Card';

const CategoryPage: FC = () => {
  const { category } = useParams<{ category: string }>();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Catégorie: {category}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Contenu de la catégorie {category} en cours de développement.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryPage;