import React from 'react';
import { diff, detailedDiff } from 'deep-object-diff';
import get from 'lodash/get'
import classes from './JsonDifferComponent.module.css';

const JsonDifferComponent = ({object1, object2}) => {
    const diffResult = diff(object1, object2);
    const detailedDiffResult = detailedDiff(object1, object2);

    return <div className={classes.reactJsonDiffer__container}>
    {'{'}
        <div className={classes.reactJsonDiffer__level}>
    <DifferProp initialObjects={({object1, object2})} diffResult={diffResult} detailedDiffResult={detailedDiffResult} path=""></DifferProp>
        </div>
    {'}'}
    </div>
}

const DifferProp = ({diffResult, detailedDiffResult, initialObjects, path}) => {
    const {object1, object2} = initialObjects;
    const {added, deleted, updated} = detailedDiffResult;
    const keys = Object.keys(diffResult);
    
    return (<>{
        keys.map(
                property => {
                    const currentPath = path == "" ? property : `${path}.${property}`;
                    const nextDiffResult = diffResult[property] || [] ;
                    const nextAdded = added[property] || [] ;
                    const nextDeleted = deleted[property] || [] ;
                    const nextUpdated = updated[property] || [] ;
                    const nextDetailedDiffResult = {added: nextAdded, deleted: nextDeleted, updated: nextUpdated};
                    const classToUse = Object.keys(added).includes(property) ? "added" : Object.keys(deleted).includes(property) ? "deleted" : "updated";
                    
                    if(typeof nextDiffResult != "string" && Object.keys(nextDiffResult).length != 0)
                    {
                        return <div>{property}: {'{'}<div className={classes.reactJsonDiffer__level}><DifferProp initialObjects={initialObjects} diffResult={nextDiffResult} detailedDiffResult={nextDetailedDiffResult} path={currentPath}></DifferProp></div>{'}'}</div>;
                    } else {
                        if(classToUse == "deleted")
                        {
                            let originalObjectContentToDisplay = JSON.stringify(get(object1, currentPath, ""));
                            originalObjectContentToDisplay = originalObjectContentToDisplay.length > 50 ? originalObjectContentToDisplay.slice(0, 50) + "..." : originalObjectContentToDisplay;
                            return <div><span className={classes.reactJsonDiffer__deleted}>{property}: {originalObjectContentToDisplay}</span>,</div>
                        }

                        if(classToUse == "added")
                        {
                            let newObjectContentToDisplay = JSON.stringify(diffResult[property]) || "";
                            newObjectContentToDisplay = newObjectContentToDisplay.length > 50 ? newObjectContentToDisplay.slice(0, 50) + "..." : newObjectContentToDisplay;

                            return <div><span className={classes.reactJsonDiffer__added}>{property}: {newObjectContentToDisplay}</span>,</div>
                        }
                        
                        if(classToUse == "updated")
                        {
                            let originalObjectContentToDisplay = JSON.stringify(get(object1, currentPath, ""));
                            originalObjectContentToDisplay = originalObjectContentToDisplay.length > 50 ? originalObjectContentToDisplay.slice(0, 50) + "..." : originalObjectContentToDisplay;

                            let newObjectContentToDisplay = JSON.stringify(diffResult[property]) || "";
                            newObjectContentToDisplay = newObjectContentToDisplay.length > 50 ? newObjectContentToDisplay.slice(0, 50) + "..." : newObjectContentToDisplay;

                            return (<div className={classes.reactJsonDiffer__updated}>
                                <div><span className={classes.reactJsonDiffer__deleted}>{property}: {originalObjectContentToDisplay}</span>,</div>
                                <div><span className={classes.reactJsonDiffer__added}>{property}: {newObjectContentToDisplay}</span>,</div>
                            </div>)
                        }
                    }
                })
        }</>);
}

export { JsonDifferComponent };
