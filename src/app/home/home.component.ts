import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../service/master.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('content') addview !: ElementRef
  constructor(private service : MasterService, private modalService: NgbModal) {
    this.GetImages();
   }

  ngOnInit(): void {
  }
  
  open() {
		this.modalService.open(this.addview, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
			},
			(reason) => {
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  //get
  imageLists :any;
  GetImages(){
    this.service.getAllImages().subscribe(result=>{
      this.imageLists = result;
    })
  }

  ImageById:any
  getImgById(id:any){
    this.service.getImageById(id).subscribe(result=>{
      this.ImageById = result;
    })
    console.log(id)
    this.open()
  }
  @ViewChild('myVideo') myVideo!: ElementRef;
playVideo() {
  // this.myVideo.nativeElement.currentTime = 0; // Reset video to start
  this.myVideo.nativeElement.play();
}
pauseVideo(){
  this.myVideo.nativeElement.pause();
}
}
