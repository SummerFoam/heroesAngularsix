import { Component, OnInit,Input } from '@angular/core';
import {Hero} from '../hero';
// 获取创建本组件的路由，
// 从这个路由中提取出 id
// 通过 HeroService 从服务器上获取具有这个 id 的英雄数据
import { ActivatedRoute} from '@angular/router';
// Location 服务在浏览器的历史栈中后退一步。
import {Location} from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
  })

export class HeroDetailComponent implements OnInit {
  @Input() hero:Hero
  constructor(
    private route: ActivatedRoute,//保存着到这个 HeroDetailComponent 实例的路由信息
    private heroService: HeroService,//从远端服务器获取英雄数据
    private location: Location //是一个 Angular 的服务，用来与浏览器打交道,导航回上一个视图
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  //获取某个人的详细信息
  getHero(): void{
    //route.snapshot 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后
    //paramMap 是一个从 URL 中提取的路由参数值的字典
    //路由参数总会是字符串。 JavaScript 的 (+) 操作符会把字符串转换成数字
    const id=+this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
  }

  //返回
  goBack(): void{
    this.location.back();
  }

  //保留修改并返回写到服务器
  save(): void{
    this.heroService.updateHero(this.hero)
    .subscribe(() => this.goBack());
  }
  
}