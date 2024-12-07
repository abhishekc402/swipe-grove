import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (credentials.username === "admin" && credentials.password === "admin") {
        localStorage.setItem("isLoggedIn", "true");
        toast.success("Successfully logged in!");
        navigate("/home");
      } else {
        toast.error("Invalid credentials!");
      }
    } else {
      // Signup logic would go here
      toast.success("Account created successfully!");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Cover Image Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/10">
        <img
          src="https://images.unsplash.com/photo-1522098635833-216c03d81fbe"
          alt="Couple shaking hands"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">Welcome to Lovable</h1>
            <p className="mt-2 text-gray-600">Find your perfect match</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
                <Button type="submit" className="w-full button-primary">
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={credentials.confirmPassword}
                  onChange={(e) =>
                    setCredentials({ ...credentials, confirmPassword: e.target.value })
                  }
                />
                <Button type="submit" className="w-full button-primary">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;