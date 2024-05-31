import { action, makeObservable, observable } from "mobx";
import { towns } from "@/app/allTowns.ts";

export class AuthStore {
  @observable townFrom: string = "";
  @observable townTo: string = "";
  @observable phone: string = "";
  @observable FIO: string = "";
  @observable formOpened = false;

  @action setFormOpened = (value: boolean) => {
    this.formOpened = value;
  };

  @action sendForm = async () => {
    const result = await fetch("http://localhost:3001/pivo", {
      method: "post",
      body: JSON.stringify({
        townFrom: this.townFrom,
        townTo: this.townTo,
        phone: this.phone,
        distance: this.distance,
        FIO: this.FIO,
      }),
    });

    // const response = await fetch("http://localhost:3001/pivo", {
    //   method: "get",
    // });
    //
    // response.json().then((data) => console.log(data));

    this.FIO = "";
    this.phone = "";
    this.townTo = "";
    this.townFrom = "";
    this.formOpened = false;
    alert(
      "Спасибо за вашу заявку! Наши менеджеры свяжутся с вами в течение рабочего дня, для уточнения деталей доставки.",
    );
  };

  @action setTownFrom = (value: string) => {
    this.townFrom = value;
  };
  @action setTownTo = (value: string) => {
    this.townTo = value;
  };

  @action setPhone = (value: string) => {
    this.phone = value;
  };
  @action setFIO = (value: string) => {
    this.FIO = value;
  };

  get fullDAY() {
    return Math.ceil(this.distance / 600);
  }

  get distance() {
    const t1 = towns.filter(
      (element) => element.address === this.townFrom,
    )?.[0];
    // console.log(
    //   towns.filter((element) => element.address === this.townFrom)[0],
    // );
    const t2 = towns.filter((element) => element.address === this.townTo)?.[0];
    // console.log(towns.filter((element) => element.address === this.townTo)[0]);
    const d = getDistanceFromLatLonInKm(
      t1?.geo_lat,
      t1?.geo_lon,
      t2?.geo_lat,
      t2?.geo_lon,
    );
    return d;
  }

  constructor() {
    makeObservable(this);
  }
}
function getDistanceFromLatLonInKm(
  lat1?: number,
  lon1?: number,
  lat2?: number,
  lon2?: number,
) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// const distanceMOWBKK = getDistanceFromLatLonInKm(55.45, 37.36, 13.45, 100.3);
