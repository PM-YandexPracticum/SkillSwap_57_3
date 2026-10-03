import { UserCard } from '@widgets/UserCard';

export default function SkillPage() {
  return (
    <main>
      <h1>SkillPage</h1>
      <p>Страница в разработке</p>
      <section>
        <h2>Похожие предложения</h2>
        <div>
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />   
        </div>
      </section>
    </main>
  );
}