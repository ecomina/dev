import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

  img_vyaonline = environment.ASSETS_PATH_IMAGES+'vyaonline.png';
  
  constructor(private activatedRoute: ActivatedRoute) { 
    super();
  }

  ngOnInit(): void {
    this.base_title = "Home";
    console.log('activatedRoute', this.activatedRoute)
  }

}
