'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomeClient() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("buy")
  const [location, setLocation] = useState("")
  const [product, setProduct] = useState("")
  const [price, setPrice] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Datos enviados:", { activeTab, location, product, price })
  }

  const login = () => {
    console.log("Iniciar sesión")
    // router.push('/login')
  }

  const register = () => {
    console.log("Navegando al registro")
    router.push('/new-user')
  }

  return (
    <>
      <h2 className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        AgroMarket
      </h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buy">Comprar</TabsTrigger>
          <TabsTrigger value="sell">Vender</TabsTrigger>
        </TabsList>
        <TabsContent value="buy">
          <Card>
            <CardHeader>
              <CardTitle>Buscar Productos</CardTitle>
              <CardDescription>Encuentra frutas y verduras frescas cerca de ti.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="location">Ubicación</Label>
                    <Input 
                      id="location" 
                      placeholder="Ingresa tu ubicación" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)} 
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="product">Producto</Label>
                    <Input 
                      id="product" 
                      placeholder="¿Qué estás buscando?" 
                      value={product} 
                      onChange={(e) => setProduct(e.target.value)} 
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                Buscar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="sell">
          <Card>
            <CardHeader>
              <CardTitle>Publicar Producto</CardTitle>
              <CardDescription>Vende tus frutas y verduras a compradores locales.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="location-sell">Ubicación</Label>
                    <Input 
                      id="location-sell" 
                      placeholder="Ingresa la ubicación de recogida" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)} 
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="product-sell">Producto</Label>
                    <Input 
                      id="product-sell" 
                      placeholder="¿Qué estás vendiendo?" 
                      value={product} 
                      onChange={(e) => setProduct(e.target.value)} 
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="price">Precio</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="Precio por unidad" 
                      value={price} 
                      onChange={(e) => setPrice(e.target.value)} 
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                Publicar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <div className="flex justify-center space-x-4 mt-6">
          <Button typeButton="secondary" onClick={login}>Ingresar</Button>
          <Button typeButton="secondary" onClick={register}> Registrarse </Button>
        </div>
      </Tabs>
    </>
  )
}