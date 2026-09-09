import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarGroupAction,
  SidebarGroupContent
} from "@/components/ui/sidebar"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom";
import { Brain, TextSearch, NotebookPen, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import { sendDatatoSheet } from "../../axiosServices/axiosHelper";
import { Button } from "@/components/ui/button"


const getInitials = (name) => {
  if (!name) return '';
  
  const names = name.trim().split(/\s+/);

  return names
    .slice(0, 2)
    .map((name) => name[0])
    .join('');
}
 
export function AppSidebar() {

  const navigate = useNavigate();
  const {userEmail, name} = useContext(AuthContext);

  const [message, setMessage] = useState("");
  const [msgBoolean, setMsgBoolean] = useState(false);

  const pages = [{id: 1, name: "نموذج الذكاء الاصطناعي", path: "/" , icon: Brain, color:"pink"},
                {id: 2, name: "ملفات وزارة مهمة", path: "/files", icon: TextSearch, color:"gray"},
                {id: 3, name: "كتابة خطة تحضير درس (قريبا)", path: "/", icon: NotebookPen, color:"blue"}]

  return (
    <Sidebar>
      <SidebarHeader className="py-4">
        <p className="font-bold font-['Noto_Sans_Arabic_Variable'] text-center mb-2">المعلم الخبير</p>
        <Separator></Separator>
      </SidebarHeader>
        <SidebarMenu>
        {pages.map((page) => {
                  const Icon = page.icon

                  return (
                    <SidebarMenuItem key={page.id} className="space-y-3">
                      <SidebarMenuButton onClick={() => navigate(page.path)} className="flex items-center hover:shadow-md transition-shadow">
                        <Icon color={page.color} />
                        <span className="font-bold font-['Noto_Sans_Arabic_Variable'] text-center">{page.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
        })}
        </SidebarMenu>
      <SidebarContent>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
              <Dialog>
              <DialogTrigger className="w-full">
                <SidebarMenuButton>
                  <Star color="yellow"></Star>
                <span className="font-bold font-['Noto_Sans_Arabic_Variable'] text-center">قيم تجربتك للموقع</span>
                </SidebarMenuButton>
              </DialogTrigger>
              {!msgBoolean ? 
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <p className="font-['Noto_Sans_Arabic_Variable'] text-center mb-1.5">إرسل تقييمك لنا</p>
                    </DialogTitle>
                  <DialogDescription className="space-y-2">
                    <Textarea
                    placeholder="اترك نصائح هنا"
                    className="font-['Noto_Sans_Arabic_Variable'] rtl"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    >
                    </Textarea>
                    <Button
                    className="font-['Noto_Sans_Arabic_Variable'] block mx-auto"
                    onClick={() => {
                      console.log(message);
                      setMsgBoolean(true);
                      sendDatatoSheet(message);
                    }}
                    >إرسال
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent> :
              <DialogContent>
                <DialogHeader>
                  <DialogTitle><p className="rtl font-['Noto_Sans_Arabic_Variable'] text-center">شكرا لتقييمك</p></DialogTitle>
                </DialogHeader>
              </DialogContent>
              }
              </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator></Separator>
        <Card>
          <CardHeader className="flex space-x-2 items-center">
            <div>
              <Avatar>
                <AvatarImage src="" className="w-2 h-2"/>
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <CardTitle className="space-y-1">
                <p className="text-sm">{name}</p>
                <Badge
                variant="destructive"
                className="cursor-pointer bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-300"
                >
                {userEmail}
                </Badge>
                </CardTitle>
            </div>
          </CardHeader>
        </Card>
      </SidebarFooter>
    </Sidebar>
  )
}