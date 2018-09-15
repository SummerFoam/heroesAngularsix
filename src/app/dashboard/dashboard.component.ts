import { Component, OnInit } from '@angular/core';
import{Hero} from '../hero';
import{HeroService} from '../hero.service';
  import { from } from 'rxjs/internal/observable/from';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //定义了一个 heroes 数组属性
  heroes:Hero[] = [];
  // HeroService 注入到私有的 heroService 属性中。
  constructor(private heroService:HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  //显示的英雄的数量缩减为四个（第二、第三、第四、第五）
  getHeroes(): void{
    this.heroService.getHeroes()
      .subscribe(heroes =>this.heroes = heroes.slice(1,5));
  }

}
