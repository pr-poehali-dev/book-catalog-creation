import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  genre: string;
}

const booksData: Book[] = [
  { id: 1, title: 'Война и мир', author: 'Лев Толстой', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/8fd4902a-ea95-4e9e-b3a5-2593ddb6b68e.jpg', genre: 'classic' },
  { id: 2, title: 'Анна Каренина', author: 'Лев Толстой', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/8fd4902a-ea95-4e9e-b3a5-2593ddb6b68e.jpg', genre: 'classic' },
  { id: 3, title: 'Преступление и наказание', author: 'Фёдор Достоевский', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/8fd4902a-ea95-4e9e-b3a5-2593ddb6b68e.jpg', genre: 'classic' },
  { id: 4, title: 'Мастер и Маргарита', author: 'Михаил Булгаков', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/8fd4902a-ea95-4e9e-b3a5-2593ddb6b68e.jpg', genre: 'classic' },
  { id: 5, title: 'Евгений Онегин', author: 'Александр Пушкин', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/8fd4902a-ea95-4e9e-b3a5-2593ddb6b68e.jpg', genre: 'classic' },
  
  { id: 6, title: 'Собака Баскервилей', author: 'Артур Конан Дойл', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/c9cea75c-e090-4ded-aebf-04b5fffcd42f.jpg', genre: 'detective' },
  { id: 7, title: 'Убийство в Восточном экспрессе', author: 'Агата Кристи', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/c9cea75c-e090-4ded-aebf-04b5fffcd42f.jpg', genre: 'detective' },
  { id: 8, title: 'Десять негритят', author: 'Агата Кристи', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/c9cea75c-e090-4ded-aebf-04b5fffcd42f.jpg', genre: 'detective' },
  { id: 9, title: 'Девушка с татуировкой дракона', author: 'Стиг Ларссон', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/c9cea75c-e090-4ded-aebf-04b5fffcd42f.jpg', genre: 'detective' },
  { id: 10, title: 'Код да Винчи', author: 'Дэн Браун', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/c9cea75c-e090-4ded-aebf-04b5fffcd42f.jpg', genre: 'detective' },
  
  { id: 11, title: 'Основание', author: 'Айзек Азимов', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/793c5627-3e60-4d1d-8348-fa59b4c2c52c.jpg', genre: 'scifi' },
  { id: 12, title: 'Дюна', author: 'Фрэнк Герберт', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/793c5627-3e60-4d1d-8348-fa59b4c2c52c.jpg', genre: 'scifi' },
  { id: 13, title: 'Солярис', author: 'Станислав Лем', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/793c5627-3e60-4d1d-8348-fa59b4c2c52c.jpg', genre: 'scifi' },
  { id: 14, title: '1984', author: 'Джордж Оруэлл', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/793c5627-3e60-4d1d-8348-fa59b4c2c52c.jpg', genre: 'scifi' },
  { id: 15, title: 'Автостопом по галактике', author: 'Дуглас Адамс', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/793c5627-3e60-4d1d-8348-fa59b4c2c52c.jpg', genre: 'scifi' },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const BookCard = ({ book }: { book: Book }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-2 border-accent/30">
      <div className="aspect-[2/3] overflow-hidden">
        <img 
          src={book.cover} 
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="space-y-1 p-4">
        <CardTitle className="text-lg leading-tight font-cormorant">{book.title}</CardTitle>
        <CardDescription className="text-sm italic">{book.author}</CardDescription>
      </CardHeader>
    </Card>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ 
        background: 'linear-gradient(135deg, #f5f1e8 0%, #e8dcc8 100%)'
      }}>
        <Card className="w-full max-w-md shadow-2xl border-4 border-accent/50">
          <CardHeader className="space-y-1 text-center pb-8">
            <div className="flex justify-center mb-4">
              <Icon name="Library" size={48} className="text-primary" />
            </div>
            <CardTitle className="text-4xl font-cormorant font-bold">Библиотека</CardTitle>
            <CardDescription className="text-base">
              {isRegistering ? 'Создайте новый аккаунт' : 'Войдите в свою коллекцию'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
              {isRegistering && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Имя</label>
                  <Input 
                    type="text" 
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-2"
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Пароль</label>
                <Input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2"
                  required
                />
              </div>
              <Button type="submit" className="w-full text-base py-6 font-semibold">
                {isRegistering ? 'Зарегистрироваться' : 'Войти'}
              </Button>
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-sm text-primary hover:underline"
                >
                  {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #f5f1e8 0%, #e8dcc8 100%)'
    }}>
      <header className="border-b-4 border-primary/30 bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Library" size={40} className="text-primary" />
            <h1 className="text-4xl font-bold font-cormorant">Библиотека</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsLoggedIn(false)}
            className="border-2"
          >
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold font-cormorant mb-4">Каталог книг</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Откройте для себя классические произведения мировой литературы
          </p>
        </div>

        <Tabs defaultValue="classic" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 h-auto p-2 bg-card border-2 border-accent/30">
            <TabsTrigger value="classic" className="text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold">
              <Icon name="BookOpen" size={20} className="mr-2" />
              Классика
            </TabsTrigger>
            <TabsTrigger value="detective" className="text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold">
              <Icon name="SearchCheck" size={20} className="mr-2" />
              Детективы
            </TabsTrigger>
            <TabsTrigger value="scifi" className="text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold">
              <Icon name="Rocket" size={20} className="mr-2" />
              Фантастика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classic" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {booksData.filter(book => book.genre === 'classic').map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detective" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {booksData.filter(book => book.genre === 'detective').map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scifi" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {booksData.filter(book => book.genre === 'scifi').map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t-4 border-primary/30 bg-card/80 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-lg font-cormorant">© 2024 Библиотека. Сокровищница мировой литературы</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
