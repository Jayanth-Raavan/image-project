import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../service/master.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private service : MasterService, private modalService : NgbModal) { 
    this.getAllImages();
  }

  ngOnInit(): void {
    // this.getall;
    this.proceedUpload();
  }
  @ViewChild('content') addView !: ElementRef
  open() {
		this.modalService.open(this.addView, { ariaLabelledBy: 'modal-basic-title' }).result.then(
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

  Productlist : any;
  getAllImages(){
    this.service.getAllImages().subscribe(result=>{
      this.Productlist = result
    })
  }
  //upload
  image : any;
  uploadImage(id:any,image:any){
    this.open();
    this.image = image;
    this.editId = id;
  }
  onChange(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.image = reader.result;
      };
    }
  }
  
//proceed upload
file !: File;
editId='';
  proceedUpload(){
    let formdata = new FormData();
    formdata.append("file",this.file,this.editId);
    this.service.UploadImage(formdata).subscribe(
      result => {
        this.getAllImages();
        console.log(this.editId);
        console.log(this.file);
        console.log(formdata);

      },
      error => {
        console.error('Upload error:', error);
        // Handle the error as needed (e.g., display an error message to the user)
      }
    );
    
  }

  removeImage(id:any,name :any){
    if(confirm("Are you sure want to delete " + name + " image?"))
    this.service.RemoveImage(id).subscribe(result=>{
      this.getAllImages();
    })
  }
}
