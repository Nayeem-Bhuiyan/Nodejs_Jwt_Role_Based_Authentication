import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FileControlService } from 'src/app/services/file/file-control.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  frmData: FormGroup;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  previewImages: string[] = [];
  imageInfos?: Observable<any>;

  constructor(public fb: FormBuilder,private _fileService: FileControlService) {
    this.frmData = this.fb.group({
      //name: [''],
      //email: [''],
    });
   }

  ngOnInit(): void {
    //this.imageInfos = this._fileService.getFiles().subscribe({
     this._fileService.getFiles().subscribe({
      next: (data) => {
      console.log(data[0]);
       
      },
      error: (error: HttpErrorResponse) => console.error(error),
      complete: () => console.info('complete'),
    });
    
  }

  showUploadPreview(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previewImages = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewImages.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this._fileService.upload(file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this._fileService.getFiles();
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }});
    }
  }

  submitForm(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
}
