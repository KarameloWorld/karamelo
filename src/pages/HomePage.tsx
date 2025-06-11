import type { FC } from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '../components/Card';

const HomePage: FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Accueil</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Bienvenue sur Karamelo ! Cette page sera développée prochainement.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;