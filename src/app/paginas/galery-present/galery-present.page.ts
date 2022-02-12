import { Component, OnInit } from '@angular/core';
import { BreadcrumbServiceService } from 'src/app/servsother/breadcrumb-service.service';
import { ProductServiceService } from '../../servsother/product-service.service';
import { PhotoServiceService } from '../../servsother/photo-service.service';


@Component({
  selector: 'app-galery-present',
  templateUrl: './galery-present.page.html',
  styleUrls: ['./galery-present.page.scss'],
})


export class GaleryPresentPage implements OnInit {
  

  images={
    "data": [{
            "itemImageSrc": "assets/demo/images/galleria/galleria1.jpg",
            "thumbnailImageSrc": "assets/demo/images/galleria/galleria1s.jpg",
            "alt": "Description for Image 1",
            "title": "Title 1"
        },
        {
            "itemImageSrc": "assets/demo/images/galleria/galleria2.jpg",
            "thumbnailImageSrc": "assets/demo/images/galleria/galleria2s.jpg",
            "alt": "Description for Image 2",
            "title": "Title 2"
        },
        
        {
            "itemImageSrc": "assets/demo/images/galleria/galleria3.jpg",
            "thumbnailImageSrc": "assets/demo/images/galleria/galleria3s.jpg",
            "alt": "Description for Image 3",
            "title": "Title 3"
        },
        {
            "itemImageSrc": "assets/demo/images/galleria/galleria4.jpg",
            "thumbnailImageSrc": "assets/demo/images/galleria/galleria4s.jpg",
            "alt": "Description for Image 4",
            "title": "Title 4"
        },
        {
            "itemImageSrc": "assets/demo/images/galleria/galleria5.jpg",
            "thumbnailImageSrc": "assets/demo/images/galleria/galleria5s.jpg",
            "alt": "Description for Image 5",
            "title": "Title 5"
        },
        {
            "itemImageSrc": "assets/demo/images/galleria/galleria6.jpg",
            "thumbnailImageSrc": "assets/demo/images/galleria/galleria6s.jpg",
            "alt": "Description for Image 6",
            "title": "Title 6"
        },
        {
            "itemImageSrc": "assets/demo/images/galleria/galleria7.jpg",
            "thumbnailImageSrc": "assets/demo/images/galleria/galleria7s.jpg",
            "alt": "Description for Image 7",
            "title": "Title 7"
        },
        {
            "itemImageSrc": "assets/demo/images/galleria/galleria8.jpg",
            "thumbnailImageSrc": "assets/demo/images/galleria/galleria8s.jpg",
            "alt": "Description for Image 8",
            "title": "Title 8"
        },
        {
            "itemImageSrc": "assets/demo/images/galleria/galleria9.jpg",
            "thumbnailImageSrc": "assets/demo/images/galleria/galleria9s.jpg",
            "alt": "Description for Image 9",
            "title": "Title 9"
        },
        {
            "itemImageSrc": "assets/demo/images/galleria/galleria10.jpg",
            "thumbnailImageSrc": "assets/demo/images/galleria/galleria10s.jpg",
            "alt": "Description for Image 10",
            "title": "Title 10"
        },
        {
            "itemImageSrc": "assets/demo/images/galleria/galleria11.jpg",
            "thumbnailImageSrc": "assets/demo/images/galleria/galleria11s.jpg",
            "alt": "Description for Image 11",
            "title": "Title 11"
        },
        {
            "itemImageSrc": "assets/demo/images/galleria/galleria12.jpg",
            "thumbnailImageSrc": "assets/demo/images/galleria/galleria12s.jpg",
            "alt": "Description for Image 12",
            "title": "Title 12"
        },
        {
            "itemImageSrc": "assets/demo/images/galleria/galleria13.jpg",
            "thumbnailImageSrc": "assets/demo/images/galleria/galleria13s.jpg",
            "alt": "Description for Image 13",
            "title": "Title 13"
        },
        {
            "itemImageSrc": "assets/demo/images/galleria/galleria14.jpg",
            "thumbnailImageSrc": "assets/demo/images/galleria/galleria14s.jpg",
            "alt": "Description for Image 14",
            "title": "Title 14"
        },
        {
            "itemImageSrc": "assets/demo/images/galleria/galleria15.jpg",
            "thumbnailImageSrc": "assets/demo/images/galleria/galleria15s.jpg",
            "alt": "Description for Image 15",
            "title": "Title 15"
        }
    ]
}
// uy
  galleriaResponsiveOptions: any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '960px',
          numVisible: 4
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  carouselResponsiveOptions: any[] = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];


  constructor(
    private breadcrumbService: BreadcrumbServiceService,
    private productService: ProductServiceService,
    private photoService: PhotoServiceService  
    ) 
  {
    this.breadcrumbService.setItems([{ label: 'UI Kit' },{ label: 'Media', routerLink: ['/uikit/media'] }]);
  }

  ngOnInit() {

  }

}
