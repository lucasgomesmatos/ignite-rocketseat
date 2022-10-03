type User = {
  name: string;
  email: string;
  address: {
    city: string;
    state?: string;
  }
}

function showWelcomeMessage(user: User) {
  return `Welcome ${user.name}, your e-mail is ${user.email}. Your city is ${user.address.city} and your state is ${user.address.state}`
}

const message = showWelcomeMessage({
  name: "Lucas",
  email: "lucas@gmail.com",
  address: {
    city: "New Your",
    state: "NY"
  }
});
console.log(message)