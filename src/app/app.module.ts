import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LevelPage } from '../pages/level/level';
import { GameService } from './game.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LevelPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LevelPage,
  ],
  providers: [
    GameService,
  ]
})
export class AppModule {}
