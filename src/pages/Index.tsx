import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  genre: string;
  year: number;
  description: string;
  pages: number;
}

const booksData: Book[] = [
  { id: 1, title: 'Война и мир', author: 'Лев Толстой', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/8fd4902a-ea95-4e9e-b3a5-2593ddb6b68e.jpg', genre: 'classic', year: 1869, description: 'Эпический роман о русском обществе во времена наполеоновских войн. История жизни нескольких аристократических семей на фоне исторических событий.', pages: 1225 },
  { id: 2, title: 'Анна Каренина', author: 'Лев Толстой', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/8fd4902a-ea95-4e9e-b3a5-2593ddb6b68e.jpg', genre: 'classic', year: 1877, description: 'Трагическая история любви замужней женщины Анны Карениной и офицера Вронского, разворачивающаяся на фоне жизни русского высшего общества.', pages: 864 },
  { id: 3, title: 'Преступление и наказание', author: 'Фёдор Достоевский', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/8fd4902a-ea95-4e9e-b3a5-2593ddb6b68e.jpg', genre: 'classic', year: 1866, description: 'Психологический роман о студенте Раскольникове, совершившем убийство, и его нравственных терзаниях.', pages: 671 },
  { id: 4, title: 'Мастер и Маргарита', author: 'Михаил Булгаков', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/8fd4902a-ea95-4e9e-b3a5-2593ddb6b68e.jpg', genre: 'classic', year: 1967, description: 'Мистический роман о визите дьявола в Москву 1930-х годов и вечной истории любви Мастера и Маргариты.', pages: 480 },
  { id: 5, title: 'Евгений Онегин', author: 'Александр Пушкин', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/8fd4902a-ea95-4e9e-b3a5-2593ddb6b68e.jpg', genre: 'classic', year: 1833, description: 'Роман в стихах о молодом дворянине Онегине и его отношениях с Татьяной Лариной, энциклопедия русской жизни.', pages: 224 },
  
  { id: 6, title: 'Собака Баскервилей', author: 'Артур Конан Дойл', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/c9cea75c-e090-4ded-aebf-04b5fffcd42f.jpg', genre: 'detective', year: 1902, description: 'Шерлок Холмс расследует таинственную смерть, связанную с легендой о призрачной собаке, терроризирующей род Баскервилей.', pages: 256 },
  { id: 7, title: 'Убийство в Восточном экспрессе', author: 'Агата Кристи', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/c9cea75c-e090-4ded-aebf-04b5fffcd42f.jpg', genre: 'detective', year: 1934, description: 'Эркюль Пуаро расследует убийство в роскошном поезде, застрявшем в снегах. У каждого пассажира есть алиби.', pages: 256 },
  { id: 8, title: 'Десять негритят', author: 'Агата Кристи', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/c9cea75c-e090-4ded-aebf-04b5fffcd42f.jpg', genre: 'detective', year: 1939, description: 'Десять незнакомцев приглашены на остров, где их начинает убивать неизвестный по принципу детской считалочки.', pages: 272 },
  { id: 9, title: 'Девушка с татуировкой дракона', author: 'Стиг Ларссон', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/c9cea75c-e090-4ded-aebf-04b5fffcd42f.jpg', genre: 'detective', year: 2005, description: 'Журналист и хакер расследуют исчезновение девушки из богатой семьи, произошедшее 40 лет назад.', pages: 590 },
  { id: 10, title: 'Код да Винчи', author: 'Дэн Браун', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/c9cea75c-e090-4ded-aebf-04b5fffcd42f.jpg', genre: 'detective', year: 2003, description: 'Профессор символогии раскрывает заговор, связанный с тайнами Леонардо да Винчи и Святым Граалем.', pages: 489 },
  
  { id: 11, title: 'Основание', author: 'Айзек Азимов', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/793c5627-3e60-4d1d-8348-fa59b4c2c52c.jpg', genre: 'scifi', year: 1951, description: 'Математик предсказывает падение Галактической империи и создаёт Основание для сохранения знаний человечества.', pages: 255 },
  { id: 12, title: 'Дюна', author: 'Фрэнк Герберт', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/793c5627-3e60-4d1d-8348-fa59b4c2c52c.jpg', genre: 'scifi', year: 1965, description: 'Эпическая сага о пустынной планете Арракис, единственном источнике ценнейшей субстанции во вселенной.', pages: 688 },
  { id: 13, title: 'Солярис', author: 'Станислав Лем', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/793c5627-3e60-4d1d-8348-fa59b4c2c52c.jpg', genre: 'scifi', year: 1961, description: 'Учёные на космической станции сталкиваются с разумным океаном планеты Солярис, материализующим их воспоминания.', pages: 204 },
  { id: 14, title: '1984', author: 'Джордж Оруэлл', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/793c5627-3e60-4d1d-8348-fa59b4c2c52c.jpg', genre: 'scifi', year: 1949, description: 'Антиутопия о тоталитарном обществе будущего с тотальной слежкой и контролем над мыслями граждан.', pages: 328 },
  { id: 15, title: 'Автостопом по галактике', author: 'Дуглас Адамс', cover: 'https://cdn.poehali.dev/projects/ddd21c83-dab3-4b8b-8ad5-4328e9230199/files/793c5627-3e60-4d1d-8348-fa59b4c2c52c.jpg', genre: 'scifi', year: 1979, description: 'Комическая космическая одиссея человека, спасённого перед уничтожением Земли и путешествующего по галактике.', pages: 224 },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [favoriteBooks, setFavoriteBooks] = useState<number[]>([]);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const toggleFavorite = (bookId: number) => {
    setFavoriteBooks(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const isFavorite = (bookId: number) => favoriteBooks.includes(bookId);

  const BookCard = ({ book }: { book: Book }) => (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-2 border-accent/30 cursor-pointer relative group"
      onClick={() => setSelectedBook(book)}
    >
      {isFavorite(book.id) && (
        <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1.5">
          <Icon name="Heart" size={16} />
        </div>
      )}
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
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowProfile(true)}
              className="border-2"
            >
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsLoggedIn(false)}
              className="border-2"
            >
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
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

      <Dialog open={showProfile} onOpenChange={() => setShowProfile(false)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-4 border-accent/50">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold font-cormorant flex items-center gap-3">
              <Icon name="User" size={32} className="text-primary" />
              Личный кабинет
            </DialogTitle>
            <DialogDescription className="text-lg">
              {name || email}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6">
            <h3 className="text-2xl font-bold font-cormorant mb-4 flex items-center gap-2">
              <Icon name="Heart" size={24} className="text-primary" />
              Избранные книги ({favoriteBooks.length})
            </h3>
            
            {favoriteBooks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Icon name="BookMarked" size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">У вас пока нет избранных книг</p>
                <p className="text-sm">Добавьте книги из каталога, чтобы сохранить их здесь</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {booksData
                  .filter(book => favoriteBooks.includes(book.id))
                  .map(book => (
                    <div key={book.id} className="relative group">
                      <Card 
                        className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-2 border-accent/30 cursor-pointer"
                        onClick={() => {
                          setShowProfile(false);
                          setSelectedBook(book);
                        }}
                      >
                        <div className="aspect-[2/3] overflow-hidden">
                          <img 
                            src={book.cover} 
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader className="space-y-1 p-3">
                          <CardTitle className="text-sm leading-tight font-cormorant">{book.title}</CardTitle>
                          <CardDescription className="text-xs italic">{book.author}</CardDescription>
                        </CardHeader>
                      </Card>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(book.id);
                        }}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedBook !== null} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-4 border-accent/50">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold font-cormorant">{selectedBook.title}</DialogTitle>
                <DialogDescription className="text-lg italic text-foreground/80">
                  {selectedBook.author}
                </DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-3 gap-6 mt-4">
                <div className="md:col-span-1">
                  <img 
                    src={selectedBook.cover} 
                    alt={selectedBook.title}
                    className="w-full rounded-lg shadow-lg border-2 border-accent/30"
                  />
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={16} className="text-primary" />
                      <span><strong>Год:</strong> {selectedBook.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="FileText" size={16} className="text-primary" />
                      <span><strong>Страниц:</strong> {selectedBook.pages}</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold font-cormorant mb-3">О книге</h3>
                  <p className="text-base leading-relaxed">
                    {selectedBook.description}
                  </p>
                  <div className="mt-6">
                    <Button 
                      className="w-full" 
                      size="lg"
                      variant={isFavorite(selectedBook.id) ? "secondary" : "default"}
                      onClick={() => {
                        toggleFavorite(selectedBook.id);
                        if (!isFavorite(selectedBook.id)) {
                          setTimeout(() => setSelectedBook(null), 300);
                        }
                      }}
                    >
                      <Icon name={isFavorite(selectedBook.id) ? "BookmarkCheck" : "BookmarkPlus"} size={20} className="mr-2" />
                      {isFavorite(selectedBook.id) ? 'В избранном' : 'Добавить в избранное'}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;