import React from 'react';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';

export default class PopoverExampleSimple extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        };
    }
    handleTouchTap = (event)=>{
        // This prevents ghost click.
        event.preventDefault();
        console.log(event.currentTarget);
        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    }
    handleRequestClose = (reason)=>{
        console.log(reason);
        this.setState({
          open: false
        });
    }
    handleClick(e){
        e.target.parentNode.style.height = '100px';
    }
    render(){
        return (
            <div>
                <button onTouchTap={this.handleTouchTap}>click me!</button>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    animation={PopoverAnimationVertical}
                >
                    <div style={{width:200,border:'2px solid red'}}>hello world!
                         <button onClick={this.handleClick}>click me</button>
                    </div>
                </Popover>
            </div>
            
        );
    }
}