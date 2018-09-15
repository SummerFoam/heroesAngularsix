import { Injectable } from '@angular/core';
//Observable 是 RxJS 库中的一个关键类。使用 RxJS 的 of() 函数来模拟从服务器返回数据。
import { Observable, of } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Hero } from './hero';
//import { HEROES } from './mock-heroes';
// 把 MessageService 注入到 HeroService 中。
import { MessageService } from './message.service';
//RxJS 的 catchError() 操作符来建立对 Observable 结果的处理管道（pipe）
import { catchError, map, tap } from 'rxjs/operators';
import { HttpHeaderResponse } from '@angular/common/http/src/response';
@Injectable({
  providedIn: 'root',
})


export class HeroService {
  //把服务器上英雄数据资源的访问地址定义为 heroesURL
  private herosUrl = 'api/heroes';

  // 在创建 HeroService 时把 MessageService 的单例注入到这个属性中。
  //  messageService 属性必须是公共属性，因为你将会在模板中绑定到它
  constructor(
    private http:HttpClient,
    public messageService: MessageService) { }

  private log(message : string){
    this.messageService.add(`HeroService: ${message}`);
  }

  //通过 HttpClient 获取英雄，HttpClient.get 返回响应数据
  getHeroes(): Observable<Hero[]> {
    //只会返回一个数组
    return this.http.get<Hero[]>(this.herosUrl)
      .pipe(
        catchError(this.handleError('getHeroes',[]))
      );
    // 获取到英雄数组时发送一条消息
    // this.messageService.add('HeroService: fetched heroes');
    // return of(HEROES);
  }

  //通过 id 获取英雄
  getHero(id: number):Observable<Hero>{
    const url=`${this.herosUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_=>this.handleError<Hero>(`getHero id=${id}`))
    )
    //反引号 ( ` ) 用于定义 JavaScript 的 模板字符串字面量，以便嵌入 i
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(HEROES.find(hero => hero.id === id));
  }

  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //修改
  updateHero(hero: Hero): Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({'content-type':'application/json'})
    };
    //HttpClient.put() 方法接受三个参数:URL 地址,要修改的数据（这里就是修改后的英雄）,选项
    return this.http.put(this.herosUrl,hero,httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
    );
  }
 
   //添加
   addHero(hero: Hero): Observable<Hero>{
    const httpOptions={
      headers: new HttpHeaders({'content-type':'application/json'})
    };
    return this.http.post<Hero>(this.herosUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  //删除
  deleteHero(hero: Hero | number): Observable<Hero>{
    const httpOptions={
      headers: new HttpHeaders({'content-type':'application/json'})
    };
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.herosUrl}/${id}`;
    return this.http.delete<Hero>(url,httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]>{
    if(!term.trim()){
      //
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.herosUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}