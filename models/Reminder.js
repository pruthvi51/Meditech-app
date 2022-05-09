class Reminder {
  constructor(name, imageUri, day, hours, min, notifId) {
    this.name = name;
    this.imageUri = imageUri;
    this.day = day;
    this.hours = hours;
    this.min = min;
    this.id = new Date().toString() + Math.random().toString();
    this.notifId = notifId;
  }
}

export default Reminder;
