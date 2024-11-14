export const getNotificationAccess = () => {
  if (
    Notification.permission === "default" ||
    Notification.permission === "denied"
  ) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification Permission Granted!");
      } else {
        console.log("Notification Permission Denied!");
      }
    });
  }
};

// Typed pushNotification function
export const pushNotification = (data: string) => {
  if (Notification.permission === "granted") {
    new Notification("New Notification From N I", {
      body: data,
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT34-YmEOyF93JHsuW_ryPYeuJLw6C3GE60VHF-NAn2MtOwlyWw4EGCH7hW_xt5OjoOXGo&usqp=CAU",
    });
  }
};
