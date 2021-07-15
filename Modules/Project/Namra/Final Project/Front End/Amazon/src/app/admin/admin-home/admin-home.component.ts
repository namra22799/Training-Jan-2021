import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.check();
    this.checkLogin();
  }
  adminName : string = '';
  check()
  {
    if(localStorage.getItem("Admin")=='')
    {
      this.router.navigate(['./Admin']);
    }
  }
  checkLogin() {
    setTimeout(() => {
      if (localStorage.getItem('AExpiration') != '') {
        let sd: Date = new Date();
        let date: Date = new Date(localStorage.getItem('AExpiration') as string);
        if (sd.getFullYear() <= date.getFullYear() && sd.getMonth() <= date.getMonth() && sd.getDate() < date.getDate()) {
          localStorage.setItem("Admin",'');
          localStorage.setItem("AToken",'');
          localStorage.setItem("AExpiration",'');
          this.router.navigate(['../'], { relativeTo: this.route });
        }
      }
      this.checkLogin();
    }, 500);
  }
  logOut()
  {
    localStorage.setItem("Admin",'');
    localStorage.setItem("AToken",'');
    this.router.navigate(['../'], {relativeTo:this.route});
  }
}
