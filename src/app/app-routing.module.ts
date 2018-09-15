import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component'
//要导航到仪表盘，路由器中就需要一个相应的路由。
import {DashboardComponent} from './dashboard/dashboard.component';
  import { from } from 'rxjs/internal/observable/from';
//添加路由定义,路由定义 会告诉路由器，当用户点击某个链接或者在浏览器地址栏中输入某个 URL 时，要显示哪个视图
const routes:Routes = [
  {
    path:'heroes',//path：一个用于匹配浏览器地址栏中 URL 的字符串
    component:HeroesComponent  //component：当导航到此路由时，路由器应该创建哪个组件,当 URL 为 localhost:4200/heroes 时，就导航到 HeroesComponent
  },
  //把一个指向 DashboardComponent 的路由添加到 AppRoutingModule.routes 数组中
  {
    path:'dashboard',
    component:DashboardComponent
  },
 
  //指向详情页面
  {
    //冒号（:）表示 :id 是一个占位符，它表示某个特定英雄的 id
    path:'detail/:id',
    component:HeroDetailComponent
  }

];

@NgModule({
  imports :[RouterModule.forRoot(routes)],
  //添加一个 @NgModule.exports 数组
  exports:[RouterModule]
})

//导出 RouterModule 让路由器的相关指令可以在 AppModule 中的组件中使用。
export class AppRoutingModule { }



