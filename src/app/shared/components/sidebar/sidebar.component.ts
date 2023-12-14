import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private gifsService: GifsService){

  }

  get TagsHistory(): string[]{
    return this.gifsService.tagsHistory;
  }

  searchTag(tag: string): void{
    return this.gifsService.searchTag(tag);
  }
}
