




/*return (
     <div>
       <GridContainer>
         <GridItem xs={12} sm={6} md={3}>
           <Card>
             <CardHeader color="warning" stats icon>
               <CardIcon color="warning">
                 <Icon>content_copy</Icon>
               </CardIcon>
               <p className={classes.cardCategory}>Used Space</p>
               <h3 className={classes.cardTitle}>
                 49/50 <small>GB</small>
               </h3>
             </CardHeader>
             <CardFooter stats>
               <div className={classes.stats}>
                 <Danger>
                   <Warning />
                 </Danger>
                 <a href="#pablo" onClick={e => e.preventDefault()}>
                   Get more space
                 </a>
               </div>
             </CardFooter>
           </Card>
         </GridItem>
         <GridItem xs={12} sm={6} md={3}>
           <Card>
             <CardHeader color="success" stats icon>
               <CardIcon color="success">
                 <Store />
               </CardIcon>
               <p className={classes.cardCategory}>Revenue</p>
               <h3 className={classes.cardTitle}>$34,245</h3>
             </CardHeader>
             <CardFooter stats>
               <div className={classes.stats}>
                 <DateRange />
                 Last 24 Hours
               </div>
             </CardFooter>
           </Card>
         </GridItem>
         <GridItem xs={12} sm={6} md={3}>
           <Card>
             <CardHeader color="danger" stats icon>
               <CardIcon color="danger">
                 <Icon>info_outline</Icon>
               </CardIcon>
               <p className={classes.cardCategory}>Fixed Issues</p>
               <h3 className={classes.cardTitle}>75</h3>
             </CardHeader>
             <CardFooter stats>
               <div className={classes.stats}>
                 <LocalOffer />
                 Tracked from Github
               </div>
             </CardFooter>
           </Card>
         </GridItem>
         <GridItem xs={12} sm={6} md={3}>
           <Card>
             <CardHeader color="info" stats icon>
               <CardIcon color="info">
                 <Accessibility />
               </CardIcon>
               <p className={classes.cardCategory}>Followers</p>
               <h3 className={classes.cardTitle}>+245</h3>
             </CardHeader>
             <CardFooter stats>
               <div className={classes.stats}>
                 <Update />
                 Just Updated
               </div>
             </CardFooter>
           </Card>
         </GridItem>
       </GridContainer>
       <GridContainer>
         <GridItem xs={12} sm={12} md={4}>
           <Card chart>
             <ChartForm ref={childChartForm}/>
             <CardHeader color="warning">
               <ChartistGraph
                 className="ct-chart"
                 data={emailsSubscriptionChart.data}
                 type="Bar"
                 options={emailsSubscriptionChart.options}
                 responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                 listener={emailsSubscriptionChart.animation}
               />
             </CardHeader>
             <CardBody>
               <h4 className={classes.cardTitle}>Consumos Personales</h4>
               <p className={classes.cardCategory}>Last Campaign Performance</p>
             </CardBody>
             <CardFooter chart>
               <div className={classes.stats}>
                 <AccessTime /> campaign sent 2 days ago
               </div>
             </CardFooter>
           </Card>
         </GridItem>
         <GridItem xs={12} sm={12} md={4}>
           <Card chart>
             <CardHeader color="danger">
               <ChartistGraph
                 className="ct-chart"
                 data={completedTasksChart.data}
                 type="Line"
                 options={completedTasksChart.options}
                 listener={completedTasksChart.animation}
               />
             </CardHeader>
             <CardBody>
               <h4 className={classes.cardTitle}>Completed Tasks</h4>
               <p className={classes.cardCategory}>Last Campaign Performance</p>
             </CardBody>
             <CardFooter chart>
               <div className={classes.stats}>
                 <AccessTime /> campaign sent 2 days ago
               </div>
             </CardFooter>
           </Card>
         </GridItem>
       </GridContainer>
       <GridContainer>
         <GridItem xs={12} sm={12} md={6}>
           <CustomTabs
             title="Tasks:"
             headerColor="primary"
             tabs={[
               {
                 tabName: "Bugs",
                 tabIcon: BugReport,
                 tabContent: (
                   <Tasks
                     checkedIndexes={[0, 3]}
                     tasksIndexes={[0, 1, 2, 3]}
                     tasks={bugs}
                   />
                 )
               },
               {
                 tabName: "Website",
                 tabIcon: Code,
                 tabContent: (
                   <Tasks
                     checkedIndexes={[0]}
                     tasksIndexes={[0, 1]}
                     tasks={website}
                   />
                 )
               },
               {
                 tabName: "Server",
                 tabIcon: Cloud,
                 tabContent: (
                   <Tasks
                     checkedIndexes={[1]}
                     tasksIndexes={[0, 1, 2]}
                     tasks={server}
                   />
                 )
               }
             ]}
           />
         </GridItem>
         <form>
          <label>Name</label>
          <input type="text" name="name" value={user.name} onChange={handleInputChange} />
          <label>UserName</label>
          <input type="text" name="username" value={user.username} onChange={handleInputChange} />
          <button>Add new user</button>
          <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
              <div class="mdc-touch-target-wrapper">
                <button type="button" class="mdc-button mdc-button--touch">
                  <div class="mdc-button__ripple"></div>
                  <span class="mdc-button__label">Upload</span>
                  <div class="mdc-button__touch"></div>
                </button>
              </div>

          </ReactFileReader>
         </form>
         <GridItem xs={12} sm={12} md={6}>
           <Card>
             <CardHeader color="warning">
               <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
               <p className={classes.cardCategoryWhite}>
                 New employees on 15th September, 2016
               </p>
             </CardHeader>
             <CardBody>
               <Table
                 tableHeaderColor="warning"
                 tableHead={["ID", "Name", "Salary", "Country"]}
                 tableData={[
                   ["1", "Dakota Rice", "$36,738", "Niger"],
                   ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                   ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                   ["4", "Philip Chaney", "$38,735", "Korea, South"]
                 ]}
               />
             </CardBody>
           </Card>
         </GridItem>
       </GridContainer>
     </div>

  )*/

