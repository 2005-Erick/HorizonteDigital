import React, { useState } from "react";
import "./App.css";
import { cn } from "./lib/utils";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/ui/carousel";
import { Checkbox } from "./components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/ui/sheet";
import { Label } from "./components/ui/label";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./components/ui/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination";
import { Separator } from "./components/ui/separator";
import { Slider } from "./components/ui/slider";
import { Switch } from "./components/ui/switch";
import { Toaster, toast } from "sonner";
import { Toggle } from "./components/ui/toggle";
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  Menu,
  Star,
  Trash2,
} from "lucide-react";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

function App() {
  const [cep, setCep] = useState("");
  const [inputCep, setInputCep] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<
    {
      id: string;
      name: string;
      price: number;
      quantity: number;
      discount: number;
      image: string;
    }[]
  >([]);

  // Dados de produtos com dados fixos para evitar re-renders inconsistentes
  const productData = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      image: "/products/Iphone14PRO.jpg",
      discount: 15,
      rating: 5,
      reviews: 342,
      price: 4999.99,
      brand: "Apple",
    },
    {
      id: 2,
      name: "Galaxy Z Flip 7 FE",
      image: "/products/GalaxyZFlip7FE.jpg",
      discount: 25,
      rating: 4,
      reviews: 128,
      price: 3499.99,
      brand: "Samsung",
    },
    {
      id: 3,
      name: "Notebook Lenovo",
      image: "/products/NotebookLenovo.jpg",
      discount: 10,
      rating: 4,
      reviews: 567,
      price: 5299.99,
      brand: "Lenovo",
    },
    {
      id: 4,
      name: "Galaxy A36",
      image: "/products/GalaxyA36.jpg",
      discount: 35,
      rating: 5,
      reviews: 890,
      price: 1999.99,
      brand: "Samsung",
    },
    {
      id: 5,
      name: "Moto G15",
      image: "/products/MotoG15.jpg",
      discount: 20,
      rating: 4,
      reviews: 245,
      price: 899.99,
      brand: "Motorola",
    },
    {
      id: 6,
      name: "Notebook Acer",
      image: "/products/NotebookAcer.jpg",
      discount: 30,
      rating: 5,
      reviews: 421,
      price: 2899.99,
      brand: "Acer",
    },
  ];

  // Dados para a grid de produtos (todos os produtos)
  const allProducts = [
    ...productData,
    {
      id: 7,
      name: "Galaxy A16",
      image: "/products/GalaxyA16.jpg",
      discount: 12,
      rating: 4,
      reviews: 456,
      price: 799.99,
      brand: "Samsung",
    },
  ];

  const handleCepSave = () => {
    setCep(inputCep);
  };

  const handleAddToCart = (
    productName: string,
    productPrice: number,
    discount: number,
    image: string
  ) => {
    const productId = productName.replace(/\s+/g, "-");

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1,
            discount,
            image,
          },
        ];
      }
    });

    setCartCount((prevCount) => prevCount + 1);
    toast.success(`${productName} foi adicionado ao carrinho!`);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === productId);
      if (itemToRemove) {
        setCartCount((prevCount) => prevCount - itemToRemove.quantity);
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems;
    });
    toast.success("Produto removido do carrinho!");
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = (item.price * (100 - item.discount)) / 100;
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  const handleClearCart = () => {
    setCartItems([]);
    setCartCount(0);
    toast.success("Carrinho limpo!");
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster richColors />
      <header className="bg-emerald-700 text-white shadow-md">
        {/* Header content remains the same */}
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div className="flex items-center gap-4 order-1">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-emerald-600"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-white">HorizonteDigital</h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <div className="hidden lg:flex items-center gap-2 cursor-pointer order-2">
                <MapPin className="h-7 w-7" />
                <div>
                  <p className="text-xs text-gray-200">Enviar para</p>
                  <p className="font-bold text-sm leading-tight">
                    {cep || "Informe o CEP"}
                  </p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Onde você quer receber suas compras?</DialogTitle>
                <DialogDescription>
                  Informe seu CEP para calcularmos o frete e o prazo de entrega.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  id="cep"
                  placeholder="00000-000"
                  className="col-span-3"
                  value={inputCep}
                  onChange={(e) => setInputCep(e.target.value)}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" onClick={handleCepSave}>
                    Salvar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="w-full lg:flex-1 flex items-center order-4 lg:order-3">
            <Input
              type="search"
              placeholder="Pesquisar produtos, marcas e muito mais..."
              className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 border-r-0 text-black bg-white w-full"
            />
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 rounded-l-none"
            >
              <Search className="h-5 w-5 text-white" />
            </Button>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 order-3 lg:order-4">
            <Button
              variant="ghost"
              className="hidden md:flex items-center gap-2 text-white hover:text-gray-200 hover:bg-emerald-600"
            >
              <User className="h-6 w-6" />
              <div>
                <p className="text-sm font-semibold leading-tight">
                  Olá, faça seu login
                </p>
                <p className="text-xs font-bold">Contas e Listas</p>
              </div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-gray-200 hover:bg-emerald-600"
            >
              <User className="h-6 w-6" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative text-white hover:text-gray-200 hover:bg-emerald-600"
                >
                  <ShoppingCart className="h-7 w-7" />
                  <span
                    className={cn(
                      "absolute top-0 right-0 -mt-1 -mr-1 bg-emerald-500 text-white text-xs font-bold rounded-full h-5 w-5 items-center justify-center",
                      cartCount > 0 ? "flex" : "hidden"
                    )}
                  >
                    {cartCount}
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:w-[420px] flex flex-col p-0">
                <SheetHeader className="px-6 pt-4 pb-2">
                  <SheetTitle className="text-xl">
                    Seu Carrinho ({cartCount})
                  </SheetTitle>
                </SheetHeader>

                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center flex-1 text-center px-6 py-8">
                    <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-gray-600 font-semibold text-base">
                      Seu carrinho está vazio
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Adicione produtos para começar!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto space-y-3 py-4 px-6">
                      {cartItems.map((item) => {
                        const discountedPrice =
                          (item.price * (100 - item.discount)) / 100;
                        const itemTotal = discountedPrice * item.quantity;

                        return (
                          <div
                            key={item.id}
                            className="flex gap-3 pb-3 border-b"
                          >
                            <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center shrink-0 border border-gray-200">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain rounded-md"
                              />
                            </div>
                            <div className="flex-1 flex flex-col justify-between min-w-0">
                              <div>
                                <h4 className="font-semibold text-base line-clamp-2">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  R$ {discountedPrice.toFixed(2)} x{" "}
                                  {item.quantity}
                                </p>
                              </div>
                              <p className="font-bold text-base text-emerald-600">
                                R$ {itemTotal.toFixed(2)}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors shrink-0 pt-1"
                              title="Remover"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t px-6 py-4 space-y-3">
                      <div className="flex justify-between text-base font-bold">
                        <span>Total:</span>
                        <span className="text-emerald-600 text-lg">
                          R$ {calculateTotal().toFixed(2)}
                        </span>
                      </div>
                      <Button className="w-full bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-2 text-base">
                        Ir para Checkout
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-base py-2"
                        onClick={handleClearCart}
                      >
                        Limpar Carrinho
                      </Button>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <nav className="bg-emerald-600 hidden lg:flex justify-center">
          <div className="container px-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-emerald-600 focus:bg-emerald-600 data-active:bg-emerald-600 data-[state=open]:bg-emerald-600">
                    Categorias
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      <ListItem href="#" title="Eletrônicos">
                        Smartphones, TVs, Notebooks, e muito mais.
                      </ListItem>
                      <ListItem href="#" title="Moda e Acessórios">
                        Roupas masculinas, femininas e infantis.
                      </ListItem>
                      <ListItem href="#" title="Casa e Cozinha">
                        Eletrodomésticos, móveis e decoração.
                      </ListItem>
                      <ListItem href="#" title="Livros e Mídia">
                        Os mais vendidos, lançamentos e clássicos.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className={
                      navigationMenuTriggerStyle() +
                      " bg-transparent text-white hover:bg-emerald-600"
                    }
                  >
                    Ofertas
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className={
                      navigationMenuTriggerStyle() +
                      " bg-transparent text-white hover:bg-emerald-600"
                    }
                  >
                    Cupons
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className={
                      navigationMenuTriggerStyle() +
                      " bg-transparent text-white hover:bg-emerald-600"
                    }
                  >
                    Contatos
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className={
                      navigationMenuTriggerStyle() +
                      " bg-transparent text-white hover:bg-emerald-600"
                    }
                  >
                    Vender
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="bg-gray-100">
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label
                    htmlFor="price-range"
                    className="text-lg font-semibold"
                  >
                    Preço
                  </Label>
                  <Slider
                    id="price-range"
                    max={1000}
                    step={10}
                    defaultValue={[500]}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>R$0</span>
                    <span>R$1000</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Marcas</Label>
                  <div className="flex flex-wrap gap-2">
                    <Toggle variant="outline">Marca A</Toggle>
                    <Toggle variant="outline">Marca B</Toggle>
                    <Toggle variant="outline">Marca C</Toggle>
                    <Toggle variant="outline">Marca D</Toggle>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="free-shipping"
                    className="text-lg font-semibold"
                  >
                    Frete Grátis
                  </Label>
                  <Switch id="free-shipping" />
                </div>
                <Separator />
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Condição</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="new" />
                    <Label htmlFor="new">Novo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="used" />
                    <Label htmlFor="used">Usado</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-4 space-y-12">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Produtos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Best Sellers Carousel */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Mais Vendidos
              </h2>
              <div className="max-w-6xl mx-auto">
                <Carousel
                  opts={{ align: "start", loop: true }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {Array.from({ length: 6 }).map((_, index) => {
                      const product = productData[index];
                      const productName = product.name;
                      const discountedPrice = (
                        (product.price * (100 - product.discount)) /
                        100
                      ).toFixed(2);

                      return (
                        <CarouselItem
                          key={index}
                          className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                        >
                          <div className="h-full">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                              <CardContent className="p-0 flex flex-col h-full">
                                {/* Imagem com Overlay */}
                                <div className="relative overflow-hidden bg-white h-64 sm:h-72 flex items-center justify-center">
                                  <img
                                    src={product.image}
                                    alt={productName}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                  />

                                  {/* Badge de Desconto */}
                                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    -{product.discount}%
                                  </div>

                                  {/* Ícone de Favorito */}
                                  <button className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100">
                                    <svg
                                      className="h-5 w-5 text-red-500"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                  </button>

                                  {/* Flash Sale Badge */}
                                  <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                    ⚡ Flash
                                  </div>
                                </div>

                                {/* Conteúdo */}
                                <div className="p-4 grow flex flex-col">
                                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors">
                                    {productName}
                                  </h3>

                                  {/* Avaliações */}
                                  <div className="flex items-center gap-1 mb-3">
                                    <div className="flex gap-0.5">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-3.5 w-3.5 ${
                                            i < product.rating
                                              ? "text-yellow-400 fill-yellow-400"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-gray-600">
                                      ({product.reviews})
                                    </span>
                                  </div>

                                  {/* Preços */}
                                  <div className="mb-3 space-y-1">
                                    <p className="text-xs text-gray-500 line-through">
                                      R$ {product.price.toFixed(2)}
                                    </p>
                                    <p className="text-xl font-bold text-green-600">
                                      R$ {discountedPrice}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                      em até 12x de R${" "}
                                      {(
                                        parseFloat(discountedPrice) / 12
                                      ).toFixed(2)}
                                    </p>
                                  </div>

                                  {/* Frete Grátis */}
                                  <p className="text-xs text-green-700 font-semibold mb-3">
                                    ✓ Frete Grátis
                                  </p>

                                  {/* Botão */}
                                  <Button
                                    className="w-full mt-auto bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-2 transition-all"
                                    onClick={() =>
                                      handleAddToCart(
                                        productName,
                                        product.price,
                                        product.discount,
                                        product.image
                                      )
                                    }
                                  >
                                    Adicionar ao Carrinho
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>

            {/* All Products Grid */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Todos os Produtos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allProducts.map((product, index) => {
                  const productName = product.name;
                  const discountedPrice = (
                    (product.price * (100 - product.discount)) /
                    100
                  ).toFixed(2);

                  return (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                    >
                      <CardContent className="p-0 flex flex-col h-full">
                        {/* Imagem com Overlay */}
                        <div className="relative overflow-hidden bg-white h-48 flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={productName}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* Badge de Desconto */}
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                            -{product.discount}%
                          </div>

                          {/* Ícone de Favorito */}
                          <button className="absolute top-2 left-2 bg-white rounded-full p-1.5 shadow-md hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100">
                            <svg
                              className="h-4 w-4 text-red-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                          </button>
                        </div>

                        {/* Conteúdo */}
                        <div className="p-3 grow flex flex-col">
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-emerald-600 transition-colors">
                            {productName}
                          </h3>

                          {/* Avaliações */}
                          <div className="flex items-center gap-1 mb-2">
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < product.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">
                              ({product.reviews})
                            </span>
                          </div>

                          {/* Preços */}
                          <div className="mb-2 space-y-0.5">
                            <p className="text-xs text-gray-500 line-through">
                              R$ {product.price.toFixed(2)}
                            </p>
                            <p className="text-lg font-bold text-green-600">
                              R$ {discountedPrice}
                            </p>
                          </div>

                          {/* Frete Grátis */}
                          <p className="text-xs text-green-700 font-semibold mb-2">
                            ✓ Frete Grátis
                          </p>

                          {/* Botão */}
                          <Button
                            className="w-full mt-auto bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-2 text-sm transition-all"
                            onClick={() =>
                              handleAddToCart(
                                productName,
                                product.price,
                                product.discount,
                                product.image
                              )
                            }
                          >
                            Adicionar ao Carrinho
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
