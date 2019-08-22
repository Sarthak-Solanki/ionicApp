import { Component, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoadingController } from "@ionic/angular";
import { async } from "@angular/core/testing";
import {Bank} from '../home/jsonModel';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})


export class HomePage  {
  city: string = "MUMBAI";
  query: string;
  initial_array:Bank[] = [];
  loading;
  data: Bank[] = [];
  constructor(public http: HttpClient, public load: LoadingController) {
    this.showLoading();
    this.callREQ(this.city);
  }
  showLoading() {
    this.load
      .create({
        message: "Loading...",
      })
      .then(loading => {
        //this.loading = loading;
        loading.present();
        setTimeout(() => {
          loading.dismiss();
        }, 3500);
      });
  }
  callREQ(city) {
    this.showLoading();
    this.http
      .get("https://vast-shore-74260.herokuapp.com/banks?city=" + city)
      .subscribe((res) => {
        //  var lenght = res.valueOf.length;
        // alert(lenght);
        for (let i = 0; i < 25; i++) {
          if (res[i] == null) {
            return;
          }
          this.data[i] = res[i];
          this.initial_array[i] = this.data[i];
        }
      });
  }
  onChanged(selected: any, selectObj) {
    //alert(selectObj);
    this.callREQ(selectObj);
  }

  filter(ev: any) {
    const val = ev.target.value;
    let filteredBank = [];
    if (val && val.trim() != "") {
      this.data = this.data.filter(item => {
        return item.bank_name.toLowerCase().includes(val.toLowerCase());
      });
    }
    else{
      this.data = this.initial_array ;
    }
  }
  updateBank() {
    let queryTextLower = this.query.toLowerCase();
    let filteredBank = [];
    this.data.forEach(element => {
      console.log("this is element" + element);
      // if(element.toLowerCase().includes(queryTextLower)){
      //   filteredBank.push(this.data);
      // }
    });
    //this.data = filteredBank;
  }
}
