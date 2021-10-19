import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-base-upload-files',
  templateUrl: './base-upload-files.component.html',
  styleUrls: ['./base-upload-files.component.css']
})
export class BaseUploadFilesComponent implements OnInit, OnDestroy {

  @Output() eventEmitterFiles = new EventEmitter();

  public readonly uploadedFile: BehaviorSubject<any> = new BehaviorSubject(null);
  private subscription: Subscription;
  public fileUploadControl = new FileUploadControl({accept: ['image/*']}, FileUploadValidators.fileSize(80000));
  
  get canUpload() {
    return (this.fileUploadControl.value.length > 0)
  }

  constructor() { 
    this.subscription = this.fileUploadControl.valueChanges.subscribe((values: Array<File>) => this.getImage(values[0]));
  }

  ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getFile(file: File) : FileReader {
    const fr = new FileReader();
    fr.onload = (e) =>  
    { 
      this.uploadedFile.next(e.target?.result);
    }
    fr.readAsDataURL(file)

    return fr;
  }

  private getImage(file: File): void {

    // if (FileReader && file) {
    //   const fr = new FileReader();
    //   fr.onload = (e) =>  
    //   { 
    //     this.uploadedFile.next(e.target?.result);
    //   }
    //   fr.readAsDataURL(file);
    // } else {
    //     this.uploadedFile.next("");
    // }
  }

  onUpload() : void {

    // this.fileUploadControl.value.forEach(f => {
    //   const fr =  this.getFile(f);
    //   console.log('onUpload', fr)
    // })

    // console.log(this.fileUploadControl.value.length)

    const files = this.fileUploadControl.value;

    this.eventEmitterFiles.emit(files);
    this.fileUploadControl.setValue([]);

  }
}
