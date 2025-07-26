import React, { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Мок-данные для демонстрации
  const chats = [
    { id: 1, name: 'Анна Зимина', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 2, online: true },
    { id: 2, name: 'Михаил Снежный', lastMessage: 'Увидимся завтра ❄️', time: '13:45', unread: 0, online: false },
    { id: 3, name: 'Группа: Зимние виды спорта', lastMessage: 'Кто едет на лыжи?', time: '12:15', unread: 5, online: true },
    { id: 4, name: 'Елена Морозова', lastMessage: 'Спасибо за помощь!', time: '11:30', unread: 0, online: true },
  ];

  const contacts = [
    { id: 1, name: 'Анна Зимина', nick: '@anna_winter', status: 'В сети', online: true },
    { id: 2, name: 'Михаил Снежный', nick: '@mike_snow', status: 'Был 5 мин назад', online: false },
    { id: 3, name: 'Елена Морозова', nick: '@elena_frost', status: 'В сети', online: true },
    { id: 4, name: 'Дмитрий Ледяной', nick: '@dmitry_ice', status: 'Был час назад', online: false },
  ];

  const RegistrationForm = () => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <Card className="w-full max-w-md mx-4 animate-fade-in shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Icon name="Snowflake" size={32} className="text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">
            Winter Messenger
          </CardTitle>
          <p className="text-slate-500 text-sm">Войдите в зимний мир общения</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Уникальный ник</label>
            <Input
              placeholder="@winter_user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-slate-200 focus:border-blue-400 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Имя</label>
            <Input
              placeholder="Ваше имя"
              className="border-slate-200 focus:border-blue-400 transition-colors"
            />
          </div>
          <Button 
            onClick={() => username && setIsRegistered(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            disabled={!username}
          >
            <Icon name="LogIn" size={18} className="mr-2" />
            Войти в мессенджер
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const sendMessage = (chatId) => {
    if (!newMessage.trim()) return;
    
    const messageId = Date.now();
    const message = {
      id: messageId,
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now()
    };
    
    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message]
    }));
    
    setNewMessage('');
    
    // Симуляция ответа собеседника
    setTimeout(() => {
      const responses = [
        'Привет! 👋',
        'Как дела? ❄️',
        'Отличная погода сегодня!',
        'Согласен полностью',
        'Интересно!',
        'Спасибо за сообщение!',
        'До встречи! 🌨️'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const responseMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'other',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now()
      };
      
      setMessages(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), responseMessage]
      }));
    }, 1000 + Math.random() * 2000);
  };

  const ChatsList = () => (
    <div className="space-y-2">
      {chats.map((chat) => (
        <Card 
          key={chat.id} 
          className="p-4 hover:bg-slate-50 transition-all duration-200 cursor-pointer hover:shadow-md border-slate-100 hover-scale"
          onClick={() => setSelectedChat(chat)}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-slate-500 text-white font-medium">
                  {chat.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {chat.online && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-slate-800 truncate">{chat.name}</h3>
                <span className="text-xs text-slate-500">{chat.time}</span>
              </div>
              <p className="text-sm text-slate-600 truncate">{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <Badge className="bg-blue-500 text-white text-xs px-2 py-1">
                {chat.unread}
              </Badge>
            )}
          </div>
        </Card>
      ))}
    </div>
  );

  const ChatWindow = ({ chat }) => {
    const chatMessages = messages[chat.id] || [];
    
    return (
      <div className="flex flex-col h-full bg-white rounded-lg shadow-lg animate-fade-in">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-slate-50">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedChat(null)}
              className="md:hidden"
            >
              <Icon name="ArrowLeft" size={18} />
            </Button>
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-slate-500 text-white text-sm">
                  {chat.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {chat.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-slate-800">{chat.name}</h3>
              <p className="text-xs text-slate-500">{chat.online ? 'В сети' : 'Был недавно'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Icon name="Phone" size={18} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Video" size={18} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="MoreVertical" size={18} />
            </Button>
          </div>
        </div>
        
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {chatMessages.length === 0 ? (
              <div className="text-center text-slate-500 py-8">
                <Icon name="MessageCircle" size={48} className="mx-auto mb-2 text-slate-300" />
                <p>Начните общение с {chat.name}</p>
                <p className="text-sm">Напишите первое сообщение ❄️</p>
              </div>
            ) : (
              chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.sender === 'me'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'me' ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Message Input */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-end space-x-2">
            <Button variant="ghost" size="sm" className="mb-2">
              <Icon name="Paperclip" size={18} />
            </Button>
            <div className="flex-1">
              <Textarea
                placeholder="Написать сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(chat.id);
                  }
                }}
                className="min-h-[40px] max-h-32 resize-none border-slate-200 focus:border-blue-400 transition-colors"
                rows={1}
              />
            </div>
            <Button 
              onClick={() => sendMessage(chat.id)}
              disabled={!newMessage.trim()}
              className="bg-blue-500 hover:bg-blue-600 mb-2"
              size="sm"
            >
              <Icon name="Send" size={18} />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const ContactsList = () => (
    <div className="space-y-2">
      {contacts.map((contact) => (
        <Card key={contact.id} className="p-4 hover:bg-slate-50 transition-all duration-200 cursor-pointer hover:shadow-md border-slate-100 hover-scale">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-slate-500 text-white text-sm">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {contact.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-slate-800">{contact.name}</h3>
              <p className="text-sm text-blue-600">{contact.nick}</p>
              <p className="text-xs text-slate-500">{contact.status}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const ProfileSection = () => (
    <Card className="p-6 animate-fade-in">
      <div className="text-center space-y-4">
        <Avatar className="w-20 h-20 mx-auto">
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-slate-600 text-white text-2xl">
            {username.charAt(1)?.toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Зимний пользователь</h2>
          <p className="text-blue-600 text-sm">{username}</p>
          <p className="text-slate-500 text-sm">В сети</p>
        </div>
        <div className="space-y-2 pt-4">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Edit" size={18} className="mr-2" />
            Редактировать профиль
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Image" size={18} className="mr-2" />
            Изменить фото
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Shield" size={18} className="mr-2" />
            Приватность
          </Button>
        </div>
      </div>
    </Card>
  );

  const SettingsSection = () => (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-medium text-slate-800 mb-3">Уведомления</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Звук сообщений</span>
            <div className="w-10 h-6 bg-blue-500 rounded-full p-1">
              <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Вибрация</span>
            <div className="w-10 h-6 bg-slate-300 rounded-full p-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-4">
        <h3 className="font-medium text-slate-800 mb-3">Оформление</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Palette" size={18} className="mr-2" />
            Зимняя тема
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Type" size={18} className="mr-2" />
            Размер шрифта
          </Button>
        </div>
      </Card>
    </div>
  );

  if (!isRegistered) {
    return <RegistrationForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Icon name="Snowflake" size={20} className="text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">
                  Winter Messenger
                </h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Icon name="Search" size={18} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="MoreVertical" size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3 bg-white/60 backdrop-blur-sm">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Поиск чатов и контактов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 border-slate-200 focus:border-blue-400 transition-colors"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 pb-20">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="chats" className="space-y-4 animate-fade-in">
              {selectedChat ? (
                <div className="h-[calc(100vh-200px)]">
                  <ChatWindow chat={selectedChat} />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-800">Чаты</h2>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      <Icon name="Plus" size={16} className="mr-1" />
                      Новый чат
                    </Button>
                  </div>
                  <ChatsList />
                </>
              )}
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Контакты</h2>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  <Icon name="UserPlus" size={16} className="mr-1" />
                  Добавить
                </Button>
              </div>
              <ContactsList />
            </TabsContent>

            <TabsContent value="profile" className="animate-fade-in">
              <ProfileSection />
            </TabsContent>

            <TabsContent value="settings" className="animate-fade-in">
              <SettingsSection />
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200">
          <div className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 bg-transparent h-16 p-2">
              <TabsTrigger 
                value="chats" 
                className="flex flex-col space-y-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 transition-all duration-200"
              >
                <Icon name="MessageCircle" size={20} />
                <span className="text-xs">Чаты</span>
              </TabsTrigger>
              <TabsTrigger 
                value="contacts"
                className="flex flex-col space-y-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 transition-all duration-200"
              >
                <Icon name="Users" size={20} />
                <span className="text-xs">Контакты</span>
              </TabsTrigger>
              <TabsTrigger 
                value="profile"
                className="flex flex-col space-y-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 transition-all duration-200"
              >
                <Icon name="User" size={20} />
                <span className="text-xs">Профиль</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="flex flex-col space-y-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 transition-all duration-200"
              >
                <Icon name="Settings" size={20} />
                <span className="text-xs">Настройки</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;