
import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';

//导入 HeroService
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;
  //heroes 属性的定义
  heroes: Hero[];
  //1. 声明了一个私有 heroService 属性，2. 把它标记为一个 HeroService 的注入点。
  constructor(private heroService: HeroService) { }

  //在 ngOnInit 生命周期钩子中调用 getHeroes()
  ngOnInit() {
    this.getHeroes();
  }
  //注入
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }
  //创建一个函数，以从服务中获取这些英雄数据
  //HeroService.getHeroes 方法之前返回一个 Hero[]， 现在它返回的是 Observable<Hero[]>。
 //subscribe 函数把这个英雄数组传给这个回调函数，该函数把英雄数组赋值给组件的 heroes 属性/
 //使用这种异步方式，当 HeroService 从远端服务器获取英雄数据时，就可以工作了。 
 getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  //添加
  //当指定的名字非空时，这个处理器会用这个名字创建一个类似于 Hero 的对象（只缺少 id 属性），并把它传给服务的 addHero() 方法。
  //当 addHero 保存成功时，subscribe 的回调函数会收到这个新英雄，并把它追加到 heroes 列表中以供显示
  add(name: string): void{
    name=name.trim();
    if(!name) {return;}
    this.heroService.addHero({name} as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    })
  }

  //删除
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}


// import { Component, OnInit } from '@angular/core';

// //导入Hero类
// import {Hero} from '../hero';
// import {HEROES} from '../mock-heroes';
//   import { from } from 'rxjs/internal/observable/from';
// @Component({
//   selector: 'app-heroes',
//   templateUrl: './heroes.component.html',
//   styleUrls: ['./heroes.component.css']
// })
// export class HeroesComponent implements OnInit {
//   //添加 hero 属性
//   // hero:Hero={
//   //   id:1,
//   //   name:'Windstorm'
//   // };
//   heroes = HEROES;
//   constructor() { }

//   ngOnInit() {
//   }

// }
