import * as CryptoJS from 'crypto-js';

export class User {
  username: string;
  password: string;

  constructor(user: User) {
    this.username = user.username;
    this.password = user.password;
  }

  async login() {

    const hashedPassword = CryptoJS.SHA256(this.password).toString();
    
      
      this.password =  hashedPassword;

      const response = await fetch(
        import.meta.env.PUBLIC_TICKETS_API + "login.php",
        {
          method: "POST",
          body: JSON.stringify(this),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to log in");
      } else {
        const data: {message: string, token:string} = await response.json();
        localStorage.setItem('token', data.token);

        return data;
      }
  }
}
