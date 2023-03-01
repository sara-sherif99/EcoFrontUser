import { Component } from '@angular/core';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillAlt} from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill1} from '@fortawesome/free-solid-svg-icons';
import { faEarthAmericas} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { NavbarService } from '../services/navbar.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  faSyncAlt=faSyncAlt;
  faEnvelope=faEnvelope;
  faMoneyBill1=faMoneyBill1;
  faLinkedin=faLinkedin;
  faBriefcase=faBriefcase;
  faShippingFast=faShippingFast;
  faEarthAmericas=faEarthAmericas;
  faMoneyBillAlt=faMoneyBillAlt;

  constructor(public nav:NavbarService){}
  ngOnInit(){
    this.nav.about=true;
    this.nav.home=false;
    this.nav.shop=false;
  }
}
