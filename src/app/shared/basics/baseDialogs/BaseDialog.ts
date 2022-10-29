import {MatDialogRef} from "@angular/material/dialog";

export abstract class BaseDialog<T> {
  protected constructor(public dialogRef: MatDialogRef<T>) {
  }

  exit() {
    this.dialogRef.close();
  }
}
