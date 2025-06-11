import type { FC } from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '../components/Card';

const ProfilePage: FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mon Profil</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Page de profil en cours de développement.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;