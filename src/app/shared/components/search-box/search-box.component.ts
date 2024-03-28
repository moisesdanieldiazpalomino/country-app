import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit , OnDestroy {
  private debouncer:Subject<string>=new Subject<string>();
  private debouncerSuscription?:Subscription;

  @Input()
  public initialValue:string='';

  @Input()
  public placeholder:string='';

  @Output()
  public onValue=new EventEmitter<string>();

  @Output()
  public onDebounce= new EventEmitter<string>();

  constructor() { }

  ngOnInit():void {
    this.debouncerSuscription=this.debouncer
    .pipe(
      debounceTime(400)
    )
    .subscribe(value=>{
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    console.log("destruindo");
    this.debouncerSuscription?.unsubscribe()

  }

  emitValue(value:string):void{
    this.onValue.emit(value);
  }

  onKeyPreess(searchTerm:string):void{

      this.debouncer.next(searchTerm);
  }

}
